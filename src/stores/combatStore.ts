import create from 'zustand';

export interface Status {
  id: string;
  name: string;
  icon: string;
  duration: number;
}

export interface Combatant {
  id: string;
  name: string;
  initiative: number;
  statuses: Status[];
}

interface CombatState {
  combatants: Combatant[];
  currentIndex: number;
  turnSeconds: number;
  setCombatants: (c: Combatant[]) => void;
  reorderCombatants: (from: number, to: number) => void;
  nextTurn: () => void;
  addStatus: (cid: string, status: Status) => void;
  removeStatus: (cid: string, sid: string) => void;
  adjustStatus: (cid: string, sid: string, delta: number) => void;
}

export const useCombatStore = create<CombatState>((set, get) => ({
  combatants: [],
  currentIndex: 0,
  turnSeconds: 30,
  setCombatants: (c) => set({ combatants: c }),
  reorderCombatants: (from, to) =>
    set((state) => {
      const list = Array.from(state.combatants);
      const [moved] = list.splice(from, 1);
      list.splice(to, 0, moved);
      return { combatants: list };
    }),
  nextTurn: () =>
    set((state) => {
      const idx = state.currentIndex;
      const updated = state.combatants.map((c, i) => {
        if (i === idx) {
          const statuses = c.statuses
            .map((s) => ({ ...s, duration: s.duration - 1 }))
            .filter((s) => s.duration > 0);
          return { ...c, statuses };
        }
        return c;
      });
      return {
        combatants: updated,
        currentIndex: (idx + 1) % (state.combatants.length || 1),
      };
    }),
  addStatus: (cid, status) =>
    set((state) => ({
      combatants: state.combatants.map((c) =>
        c.id === cid ? { ...c, statuses: [...c.statuses, status] } : c,
      ),
    })),
  removeStatus: (cid, sid) =>
    set((state) => ({
      combatants: state.combatants.map((c) =>
        c.id === cid
          ? { ...c, statuses: c.statuses.filter((s) => s.id !== sid) }
          : c,
      ),
    })),
  adjustStatus: (cid, sid, delta) =>
    set((state) => ({
      combatants: state.combatants.map((c) =>
        c.id === cid
          ? {
              ...c,
              statuses: c.statuses.map((s) =>
                s.id === sid ? { ...s, duration: s.duration + delta } : s,
              ),
            }
          : c,
      ),
    })),
}));

export const useCombat = useCombatStore;

export const useInitiative = () =>
  useCombatStore((state) => ({
    combatants: state.combatants,
    currentIndex: state.currentIndex,
    reorderCombatants: state.reorderCombatants,
    nextTurn: state.nextTurn,
  }));

export const useStatuses = (id: string) =>
  useCombatStore((state) => {
    const combatant = state.combatants.find((c) => c.id === id);
    return {
      statuses: combatant?.statuses || [],
      addStatus: (s: Status) => state.addStatus(id, s),
      removeStatus: (sid: string) => state.removeStatus(id, sid),
      adjustStatus: (sid: string, d: number) => state.adjustStatus(id, sid, d),
    };
  });
