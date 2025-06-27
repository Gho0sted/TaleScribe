import create from 'zustand';
import { LOOT_TABLES, LootTableKey } from '../data/lootTables';
import { EVENTS, EventCategory } from '../data/events';
import {
  NAMES,
  RACES,
  GENDERS,
  OCCUPATIONS,
  PERSONALITIES,
  MOTIVATIONS,
  CONNECTIONS,
  VOICE_TRAITS,
} from '../data/npcTemplates';

export interface LootItem {
  id: string;
  name: string;
  rarity: string;
  quantity: number;
  value: number;
}

export interface Event {
  id: string;
  category: EventCategory;
  title: string;
  description: string;
  consequences?: string;
}

export interface NPCProfile {
  id: string;
  name: string;
  race: string;
  gender: string;
  occupation: string;
  personality: string;
  motivation: string;
  connections: string[];
  voiceTraits: string;
}

interface ContentState {
  loot: LootItem[];
  events: Event[];
  npcs: NPCProfile[];
  generateLoot: (level: number, types: string[]) => void;
  generateEvent: (category: EventCategory) => void;
  generateNPC: (count?: number) => void;
  resetLoot: () => void;
  resetEvents: () => void;
  resetNPCs: () => void;
}

const rand = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const useContentStore = create<ContentState>((set) => ({
  loot: [],
  events: [],
  npcs: [],
  generateLoot: (level, types) => {
    const rarity: LootTableKey =
      level > 10 ? 'epic' : level > 5 ? 'rare' : 'common';
    let table = LOOT_TABLES[rarity];
    if (types.length) table = table.filter((i) => types.includes(i.type));
    const loot = table.map((i) => ({ ...i, rarity, quantity: 1 }));
    set({ loot });
  },
  generateEvent: (category) => {
    const e = rand(EVENTS[category]);
    set({ events: [{ ...e, category }] });
  },
  generateNPC: (count = 1) => {
    const npcs: NPCProfile[] = [];
    for (let i = 0; i < count; i++) {
      npcs.push({
        id: Date.now().toString() + i,
        name: rand(NAMES),
        race: rand(RACES),
        gender: rand(GENDERS),
        occupation: rand(OCCUPATIONS),
        personality: rand(PERSONALITIES),
        motivation: rand(MOTIVATIONS),
        connections: [rand(CONNECTIONS)],
        voiceTraits: rand(VOICE_TRAITS),
      });
    }
    set((s) => ({ npcs: [...s.npcs, ...npcs] }));
  },
  resetLoot: () => set({ loot: [] }),
  resetEvents: () => set({ events: [] }),
  resetNPCs: () => set({ npcs: [] }),
}));

export const useLootGenerator = () =>
  useContentStore((state) => ({
    loot: state.loot,
    generateLoot: state.generateLoot,
    resetLoot: state.resetLoot,
  }));

export const useEventGenerator = () =>
  useContentStore((state) => ({
    events: state.events,
    generateEvent: state.generateEvent,
    resetEvents: state.resetEvents,
  }));

export const useNPCGenerator = () =>
  useContentStore((state) => ({
    npcs: state.npcs,
    generateNPC: state.generateNPC,
    resetNPCs: state.resetNPCs,
  }));
