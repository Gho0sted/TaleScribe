import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LogLevel = 'info' | 'error';

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: number;
}

interface LogState {
  logs: LogEntry[];
  addLog: (level: LogLevel, message: string) => void;
  clearLogs: () => void;
}

export const useLogStore = create<LogState>(
  persist(
    (set) => ({
      logs: [],
      addLog: (level, message) =>
        set((state) => ({
          logs: [
            {
              id: Date.now().toString(),
              level,
              message,
              timestamp: Date.now(),
            },
            ...state.logs,
          ].slice(0, 100),
        })),
      clearLogs: () => set({ logs: [] }),
    }),
    { name: 'log-store' },
  ),
);
