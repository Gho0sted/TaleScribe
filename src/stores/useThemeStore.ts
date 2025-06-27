import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeSettingsState {
  scale: number;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  setScale: (v: number) => void;
  setFont: (font: string) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
}

export const useThemeStore = create<ThemeSettingsState>(
  persist(
    (set) => ({
      scale: 1,
      font: 'Inter, sans-serif',
      primaryColor: '#4f46e5',
      secondaryColor: '#d946ef',
      setScale: (v) => set({ scale: v }),
      setFont: (font) => set({ font }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setSecondaryColor: (color) => set({ secondaryColor: color }),
    }),
    {
      name: 'theme-settings',
      version: 2,
      migrate: (state) => ({ ...state }),
    },
  ),
);
