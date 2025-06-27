import { create } from 'zustand';

export interface SessionNote {
  sessionId: string;
  content: string;
}

interface JournalState {
  notes: Record<string, string>;
  setNote: (id: string, content: string) => void;
  removeNote: (id: string) => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  notes: {},
  setNote: (id, content) =>
    set((state) => ({ notes: { ...state.notes, [id]: content } })),
  removeNote: (id) =>
    set((state) => {
      const newNotes = { ...state.notes };
      delete newNotes[id];
      return { notes: newNotes };
    }),
}));
