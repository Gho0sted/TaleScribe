export type CloudProvider = 'google' | 'dropbox';

interface BackupFile {
  id: string;
  name: string;
  modified?: string;
}

class CloudSyncService {
  private dbPromise: Promise<IDBDatabase>;

  constructor() {
    this.dbPromise = this.openDB();
  }

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('cloud-sync', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('tokens')) {
          db.createObjectStore('tokens');
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  private async getToken(provider: CloudProvider): Promise<string | undefined> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('tokens');
      const store = tx.objectStore('tokens');
      const req = store.get(provider);
      req.onsuccess = () => resolve(req.result as string | undefined);
      req.onerror = () => reject(req.error);
    });
  }

  private async setToken(provider: CloudProvider, token: string) {
    const db = await this.dbPromise;
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction('tokens', 'readwrite');
      const store = tx.objectStore('tokens');
      const req = store.put(token, provider);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async authorizeGoogle() {
    if (!window.gapi) throw new Error('gapi not loaded');
    return new Promise<void>((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            clientId: process.env.GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/drive.file',
          });
          const auth = window.gapi.auth2.getAuthInstance();
          await auth.signIn();
          const token = auth.currentUser.get().getAuthResponse().access_token;
          await this.setToken('google', token);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  authorizeDropbox(redirectUri: string, clientId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const authUrl = `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      const win = window.open(authUrl, '_blank');
      if (!win) return reject(new Error('Popup blocked'));
      const timer = setInterval(() => {
        try {
          const hash = win.location.hash;
          if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            if (token) {
              clearInterval(timer);
              win.close();
              this.setToken('dropbox', token).then(() => resolve());
            }
          }
        } catch (e) {
          /* ignore cross origin */
        }
        if (win.closed) {
          clearInterval(timer);
          reject(new Error('Auth window closed'));
        }
      }, 500);
    });
  }

  private async request(
    provider: CloudProvider,
    input: RequestInfo,
    init: RequestInit,
  ) {
    const token = await this.getToken(provider);
    if (!token) throw new Error('Not authorized');
    const headers = new Headers(init.headers);
    if (provider === 'google') {
      headers.set('Authorization', `Bearer ${token}`);
    } else if (provider === 'dropbox') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  }

  async uploadBackup(provider: CloudProvider, name: string, data: Blob) {
    if (provider === 'google') {
      const metadata = { name };
      const form = new FormData();
      form.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' }),
      );
      form.append('file', data);
      await this.request(
        provider,
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          body: form,
        },
      );
    } else {
      await this.request(
        provider,
        'https://content.dropboxapi.com/2/files/upload',
        {
          method: 'POST',
          headers: {
            'Dropbox-API-Arg': JSON.stringify({
              path: '/' + name,
              mode: 'add',
              autorename: true,
            }),
            'Content-Type': 'application/octet-stream',
          },
          body: data,
        },
      );
    }
  }

  async listBackups(provider: CloudProvider): Promise<BackupFile[]> {
    if (provider === 'google') {
      const res = await this.request(
        provider,
        'https://www.googleapis.com/drive/v3/files?q=name%20contains%20%27_backup_%27&fields=files(id,name,modifiedTime)',
        { method: 'GET' },
      );
      const json = await res.json();
      return json.files as BackupFile[];
    }
    const res = await this.request(
      provider,
      'https://api.dropboxapi.com/2/files/list_folder',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '' }),
      },
    );
    const data = await res.json();
    return (data.entries || []).map((e: any) => ({ id: e.id, name: e.name }));
  }

  async downloadBackup(provider: CloudProvider, id: string): Promise<Blob> {
    if (provider === 'google') {
      const res = await this.request(
        provider,
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
        { method: 'GET' },
      );
      return res.blob();
    }
    const res = await this.request(
      provider,
      'https://content.dropboxapi.com/2/files/download',
      {
        method: 'POST',
        headers: { 'Dropbox-API-Arg': JSON.stringify({ path: id }) },
      },
    );
    return res.blob();
  }
}

export const cloudSync = new CloudSyncService();
export type { BackupFile };
