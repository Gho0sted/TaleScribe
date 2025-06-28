import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeSettingsState {
  mode: 'light' | 'dark' | 'auto';
  scale: number;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  setMode: (m: 'light' | 'dark' | 'auto') => void;
  setScale: (v: number) => void;
  setFont: (font: string) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
}

export const useThemeStore = create<ThemeSettingsState>(
  persist(
    (set) => ({
      mode: 'dark',
      scale: 1,
      font: 'Inter, sans-serif',
      primaryColor: '#4f46e5',
      secondaryColor: '#d946ef',
      setMode: (m) => set({ mode: m }),
      setScale: (v) => set({ scale: v }),
      setFont: (font) => set({ font }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setSecondaryColor: (color) => set({ secondaryColor: color }),
    }),
    {
      name: 'theme-settings',
      version: 3,
      migrate: (state) => ({ mode: 'dark', ...state }),
    },
  ),
);
