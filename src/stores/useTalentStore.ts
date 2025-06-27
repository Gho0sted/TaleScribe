import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Talent {
  id: string;
  name: string;
  description: string;
  level: number;
}

interface TalentState {
  talents: Record<string, Talent[]>;
  setClassTalents: (cls: string, talents: Talent[]) => void;
  addTalent: (cls: string, talent: Omit<Talent, 'id'>) => void;
  updateTalent: (cls: string, id: string, updates: Partial<Talent>) => void;
  removeTalent: (cls: string, id: string) => void;
}

export const useTalentStore = create<TalentState>(
  persist(
    (set) => ({
      talents: {},
      setClassTalents: (cls, talents) =>
        set((state) => ({ talents: { ...state.talents, [cls]: talents } })),
      addTalent: (cls, talent) =>
        set((state) => ({
          talents: {
            ...state.talents,
            [cls]: [
              ...(state.talents[cls] || []),
              { ...talent, id: Date.now().toString() },
            ],
          },
        })),
      updateTalent: (cls, id, updates) =>
        set((state) => ({
          talents: {
            ...state.talents,
            [cls]: (state.talents[cls] || []).map((t) =>
              t.id === id ? { ...t, ...updates } : t,
            ),
          },
        })),
      removeTalent: (cls, id) =>
        set((state) => ({
          talents: {
            ...state.talents,
            [cls]: (state.talents[cls] || []).filter((t) => t.id !== id),
          },
        })),
    }),
    { name: 'talent-store' },
  ),
);
