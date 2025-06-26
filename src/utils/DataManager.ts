export class DataManager {
  private cache = new Map<string, unknown>();
  private dirtyKeys = new Set<string>();
  private lastSaveTime = Date.now();
  private autoSaveInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.setupAutoSave();
  }

  async saveData(key: string, data: unknown): Promise<void> {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
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

      const stored = localStorage.getItem(key);
      if (!stored) {
        return defaultValue;
      }

      const data = JSON.parse(stored) as T;
      this.cache.set(key, data);
      return data;
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return defaultValue;
    }
  }

  markDirty(key: string): void {
    this.dirtyKeys.add(key);
  }

  clearCache(): void {
    this.cache.clear();
    this.dirtyKeys.clear();
  }

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

  private performAutoSave(): void {
    if (this.dirtyKeys.size === 0) return;
    console.log('Auto-saving dirty keys:', Array.from(this.dirtyKeys));
    this.dirtyKeys.forEach((key) => {
      const data = this.cache.get(key);
      if (data !== undefined) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    });
    this.dirtyKeys.clear();
    this.lastSaveTime = Date.now();
  }
}
