import { vi, describe, it, expect, beforeEach } from 'vitest';
import { DataManager } from '../src/utils/DataManager';

vi.mock('../src/utils/idb', () => ({
  getFromDB: vi.fn(async () => 'value'),
  setToDB: vi.fn(async () => undefined),
  deleteFromDB: vi.fn(async () => undefined),
  addToQueue: vi.fn(async () => undefined),
  getQueue: vi.fn(async () => []),
  clearQueue: vi.fn(async () => undefined),
}));

const { setToDB, getFromDB } = require('../src/utils/idb');

describe('DataManager', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(global.navigator, 'onLine', { value: true, writable: true });
  });

  it('saves and loads data', async () => {
    const dm = new DataManager();
    await dm.saveData('key', { a: 1 });
    expect(setToDB).toHaveBeenCalledWith('key', { a: 1 });
    const val = await dm.loadData('key');
    expect(val).toBe('value');
    dm.destroy();
  });
});
