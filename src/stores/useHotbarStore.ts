import create from 'zustand';
import { persist } from 'zustand/middleware';

export type MacroType = 'spell' | 'ability' | 'custom';

export interface Macro {
  type: MacroType;
  id: string;
  template?: string;
}

interface HotbarState {
  slots: (Macro | null)[];
  setSlot: (index: number, macro: Macro | null) => void;
  setSlotCount: (count: number) => void;
}

export const useHotbarStore = create<HotbarState>(
  persist(
    (set, get) => ({
      slots: Array(8).fill(null),
      setSlot: (index, macro) =>
        set((state) => {
          const slots = [...state.slots];
          slots[index] = macro;
          return { slots };
        }),
      setSlotCount: (count) =>
        set((state) => {
          const slots = [...state.slots];
          if (slots.length < count)
            slots.push(...Array(count - slots.length).fill(null));
          else if (slots.length > count) slots.length = count;
          return { slots };
        }),
    }),
    { name: 'hotbar-store' },
  ),
);

export const useHotbar = () =>
  useHotbarStore((state) => ({
    slots: state.slots,
    setSlot: state.setSlot,
    setSlotCount: state.setSlotCount,
  }));
