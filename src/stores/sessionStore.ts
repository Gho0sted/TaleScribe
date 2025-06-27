import { create } from 'zustand';
import { formatISO } from 'date-fns';

export interface SessionEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

interface SessionState {
  sessions: SessionEvent[];
  addSession: (e: Omit<SessionEvent, 'id'>) => void;
  updateSession: (id: string, updates: Partial<SessionEvent>) => void;
  removeSession: (id: string) => void;
  setSessions: (events: SessionEvent[]) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  addSession: (e) =>
    set((state) => ({
      sessions: [
        ...state.sessions,
        {
          ...e,
          id: Date.now().toString(),
          start: formatISO(new Date(e.start)),
          end: formatISO(new Date(e.end)),
        },
      ],
    })),
  updateSession: (id, updates) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    })),
  removeSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
    })),
  setSessions: (events) => set({ sessions: events }),
}));
