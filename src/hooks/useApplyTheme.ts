import { useEffect } from 'react';
import { useThemeStore } from '../stores/useThemeStore';

export const useApplyTheme = () => {
  const { mode, scale, font, primaryColor, secondaryColor } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-scale', String(scale));
    root.style.setProperty('--font-family', font);
    root.style.setProperty('--primary-accent', primaryColor);
    root.style.setProperty('--secondary-accent', secondaryColor);

    const applyMode = () => {
      if (mode === 'auto') {
        const prefers = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefers.matches) root.classList.add('dark');
        else root.classList.remove('dark');
      } else if (mode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    applyMode();
  }, [mode, scale, font, primaryColor, secondaryColor]);
};
