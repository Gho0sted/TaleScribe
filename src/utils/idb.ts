/**
 * IndexedDB helpers with simple AES-GCM encryption.
 * Вспомогательные функции для IndexedDB с шифрованием AES-GCM.
 */
import { openDB } from 'idb';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const secret = (process.env.DB_SECRET || 'talescribe_secret')
  .padEnd(32, '0')
  .slice(0, 32);

const importKey = async () => {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );
};

const toBase64 = (arr: Uint8Array) => btoa(String.fromCharCode(...arr));
const fromBase64 = (str: string) =>
  Uint8Array.from(atob(str), (c) => c.charCodeAt(0));

const encrypt = async (data: unknown) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await importKey();
  const encoded = textEncoder.encode(JSON.stringify(data));
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded),
  );
  return `${toBase64(iv)}.${toBase64(cipher)}`;
};

const decrypt = async (cipherText: string) => {
  const [ivStr, dataStr] = cipherText.split('.');
  const iv = fromBase64(ivStr);
  const data = fromBase64(dataStr);
  const key = await importKey();
  const plain = new Uint8Array(
    await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data),
  );
  return JSON.parse(textDecoder.decode(plain));
};

const dbPromise = openDB('talescribe', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('data')) {
      db.createObjectStore('data');
    }
    if (!db.objectStoreNames.contains('queue')) {
      db.createObjectStore('queue', { autoIncrement: true });
    }
  },
});

export const getFromDB = async <T>(key: string): Promise<T | undefined> => {
  const stored = await (await dbPromise).get('data', key);
  if (!stored) return undefined;
  if (typeof stored !== 'string') return stored as T;
  try {
    return (await decrypt(stored)) as T;
  } catch (e) {
    console.error('Decrypt error:', e);
    return undefined;
  }
};

export const setToDB = async <T>(key: string, value: T): Promise<void> => {
  const cipher = await encrypt(value);
  await (await dbPromise).put('data', cipher, key);
};

export const addToQueue = async <T>(op: T): Promise<void> => {
  const cipher = await encrypt(op);
  await (await dbPromise).add('queue', cipher);
};

export const getQueue = async <T = unknown>(): Promise<T[]> => {
  const all = await (await dbPromise).getAll('queue');
  const result: T[] = [] as T[];
  for (const item of all) {
    if (typeof item === 'string') {
      try {
        result.push((await decrypt(item)) as T);
      } catch {
        /* ignore */
      }
    } else {
      result.push(item as T);
    }
  }
  return result;
};

export const clearQueue = async (): Promise<void> => {
  const db = await dbPromise;
  const tx = db.transaction('queue', 'readwrite');
  tx.store.clear();
  await tx.done;
};
