// Магазин выбранной редакции
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEditionStore = create(
  persist(
    (set) => ({
      edition: 'dnd5e',
      setEdition: (e) => set({ edition: e }),
    }),
    { name: 'talescribe-edition' }
  )
);
