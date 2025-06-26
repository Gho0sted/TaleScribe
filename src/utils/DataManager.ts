/**
 * Utility class for saving and loading application data using IndexedDB.
 * Provides a simple cache layer and automatic background saving.
 * Утилитный класс для сохранения и загрузки данных через IndexedDB,
 * обеспечивающий кэш и автоматическое фоновое сохранение.
*/
import { getFromDB, setToDB, addToQueue, getQueue, clearQueue } from './idb';

export class DataManager {
  private cache = new Map<string, unknown>();
  private dirtyKeys = new Set<string>();
  private lastSaveTime = Date.now();
  private autoSaveInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.setupAutoSave();
    if (navigator.onLine) {
      this.flushQueue();
    }
    window.addEventListener('online', () => this.flushQueue());
  }

  async saveData(key: string, data: unknown): Promise<void> {
    try {
      if (navigator.onLine) {
        await setToDB(key, data);
      } else {
        await addToQueue({ key, data });
      }
      this.cache.set(key, data);
      this.dirtyKeys.delete(key);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  async loadData<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
    try {
      if (this.cache.has(key)) {
        return this.cache.get(key) as T;
      }
      const stored = await getFromDB<T>(key);
      if (stored === undefined) {
        return defaultValue;
      }
      this.cache.set(key, stored);
      return stored;
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Mark specific key as changed to trigger auto save
   * Пометить ключ измененным для последующего автосохранения
   */
  markDirty(key: string): void {
    this.dirtyKeys.add(key);
  }

  /**
   * Remove all cached values
   * Очистить все закешированные значения
   */
  clearCache(): void {
    this.cache.clear();
    this.dirtyKeys.clear();
  }

  /**
   * Stop auto saving and clean timer
   * Остановить автосохранение и очистить таймер
   */
  destroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  private setupAutoSave(): void {
    this.autoSaveInterval = setInterval(() => {
      if (this.dirtyKeys.size > 0 && Date.now() - this.lastSaveTime > 30000) {
        this.performAutoSave();
      }
    }, 5000);
  }

  /**
   * Actually persist dirty keys to localStorage
   * Непосредственно сохранить измененные ключи в localStorage
   */
  private performAutoSave(): void {
    if (this.dirtyKeys.size === 0) return;
    console.log('Auto-saving dirty keys:', Array.from(this.dirtyKeys));
    this.dirtyKeys.forEach((key) => {
      const data = this.cache.get(key);
      if (data !== undefined) {
        this.saveData(key, data);
      }
    });
    this.dirtyKeys.clear();
    this.lastSaveTime = Date.now();
  }

  private async flushQueue() {
    const ops = await getQueue();
    for (const op of ops) {
      await setToDB(op.key, op.data);
    }
    if (ops.length) await clearQueue();
  }
}
