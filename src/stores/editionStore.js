// Магазин выбранной редакции
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

export const useEditionStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        edition: 'dnd5e',
        setEdition: (e) => set({ edition: e }),
      }),
      { name: 'talescribe-edition' }
    )
  )
);
