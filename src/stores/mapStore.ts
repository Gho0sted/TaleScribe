import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Marker {
  id: string;
  x: number;
  y: number;
}

export interface Token {
  id: string;
  x: number;
  y: number;
  src: string;
  rotation: number;
  scale: number;
}

interface MapState {
  background: string;
  markers: Marker[];
  tokens: Token[];
  setBackground: (url: string) => void;
  addMarker: (x: number, y: number) => void;
  updateMarker: (id: string, x: number, y: number) => void;
  removeMarker: (id: string) => void;
  addToken: (t: Omit<Token, 'id'>) => void;
  updateToken: (id: string, data: Partial<Token>) => void;
  removeToken: (id: string) => void;
}

export const useMapStore = create<MapState>(
  persist(
    (set) => ({
      background: '',
      markers: [],
      tokens: [],
      setBackground: (url) => set({ background: url }),
      addMarker: (x, y) =>
        set((state) => ({
          markers: [...state.markers, { id: Date.now().toString(), x, y }],
        })),
      updateMarker: (id, x, y) =>
        set((state) => ({
          markers: state.markers.map((m) => (m.id === id ? { ...m, x, y } : m)),
        })),
      removeMarker: (id) =>
        set((state) => ({ markers: state.markers.filter((m) => m.id !== id) })),
      addToken: (t) =>
        set((state) => ({
          tokens: [...state.tokens, { ...t, id: Date.now().toString() }],
        })),
      updateToken: (id, data) =>
        set((state) => ({
          tokens: state.tokens.map((tok) =>
            tok.id === id ? { ...tok, ...data } : tok,
          ),
        })),
      removeToken: (id) =>
        set((state) => ({ tokens: state.tokens.filter((t) => t.id !== id) })),
    }),
    { name: 'map-store' },
  ),
);
