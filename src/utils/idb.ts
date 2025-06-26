import { openDB } from 'idb';

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
  return (await dbPromise).get('data', key);
};

export const setToDB = async (key: string, value: any): Promise<void> => {
  await (await dbPromise).put('data', value, key);
};

export const addToQueue = async (op: any): Promise<void> => {
  await (await dbPromise).add('queue', op);
};

export const getQueue = async (): Promise<any[]> => {
  return (await dbPromise).getAll('queue');
};

export const clearQueue = async (): Promise<void> => {
  const db = await dbPromise;
  const tx = db.transaction('queue', 'readwrite');
  tx.store.clear();
  await tx.done;
};
