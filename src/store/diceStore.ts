// Магазин бросков костей
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDiceStore = create(
  persist(
    (set) => ({
      history: [],
      addRoll: (roll) =>
        set((s) => ({ history: [roll, ...s.history].slice(0, 20) })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'talescribe-dice' }
  )
);
