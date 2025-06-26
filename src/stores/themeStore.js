// Магазин темы приложения
// Zustand-хранилище для темы и акцентного цвета
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACCENT_COLORS } from '../constants/colors';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      accentColor: 'indigo',
      currentAccent: ACCENT_COLORS.indigo,
      // Переключает тёмную и светлую тему
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      // Устанавливает новый акцент и вычисляет цвета
      setAccentColor: (color) => set({ accentColor: color, currentAccent: ACCENT_COLORS[color] || ACCENT_COLORS.indigo }),
    }),
    { name: 'talescribe-theme' }
  )
);
