// Магазин персонажей
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { z } from 'zod';

// Схема персонажа
const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  class: z.string().optional(),
});

export const useCharactersStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        characters: [],
        addCharacter: (c) =>
          set((s) => {
            if (CharacterSchema.safeParse(c).success) {
              return { characters: [...s.characters, c] };
            }
            return s;
          }),
      }),
      { name: 'talescribe-characters' }
    )
  )
);
