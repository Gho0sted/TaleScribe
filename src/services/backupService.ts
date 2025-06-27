import { useSessionStore } from '../stores/sessionStore';
import { useJournalStore } from '../stores/journalStore';
import { cloudSync, CloudProvider } from './cloudSyncService';

export interface FullBackup {
  local: Record<string, any>;
  sessions: ReturnType<typeof useSessionStore.getState>['sessions'];
  notes: ReturnType<typeof useJournalStore.getState>['notes'];
}

const PERSIST_KEYS = [
  'talescribe_data',
  'map-store',
  'audio-store',
  'chat-store',
  'hotbar-store',
  'plugin-store',
  'talent-store',
  'theme-settings',
];

export function serializeState(): FullBackup {
  const local: Record<string, any> = {};
  PERSIST_KEYS.forEach((k) => {
    const val = localStorage.getItem(k);
    if (val) local[k] = JSON.parse(val);
  });
  const sessions = useSessionStore.getState().sessions;
  const notes = useJournalStore.getState().notes;
  return { local, sessions, notes };
}

export function mergeState(data: FullBackup) {
  Object.entries(data.local).forEach(([k, v]) => {
    localStorage.setItem(k, JSON.stringify(v));
  });
  useSessionStore.setState({
    sessions: mergeArray(
      useSessionStore.getState().sessions,
      data.sessions,
      'id',
    ),
  });
  useJournalStore.setState({
    notes: { ...useJournalStore.getState().notes, ...data.notes },
  });
}

function mergeArray<T extends Record<string, any>>(
  a: T[],
  b: T[],
  key: keyof T,
): T[] {
  const existing = new Map(a.map((i) => [i[key], i]));
  b.forEach((i) => {
    if (!existing.has(i[key])) existing.set(i[key], i);
  });
  return Array.from(existing.values());
}

export async function backupNow(provider: CloudProvider, campaign: string) {
  const data = serializeState();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const name = `${campaign}_backup_${Date.now()}.json`;
  await cloudSync.uploadBackup(provider, name, blob);
}

export async function listBackups(provider: CloudProvider) {
  return cloudSync.listBackups(provider);
}

export async function restoreBackup(provider: CloudProvider, id: string) {
  const blob = await cloudSync.downloadBackup(provider, id);
  const text = await blob.text();
  const data = JSON.parse(text) as FullBackup;
  mergeState(data);
}
