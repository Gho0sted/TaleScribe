import { useEffect } from 'react';
import { useThemeStore } from '../stores/useThemeStore';

export const useApplyTheme = () => {
  const { scale, font, primaryColor, secondaryColor } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-scale', String(scale));
    root.style.setProperty('--font-family', font);
    root.style.setProperty('--primary-accent', primaryColor);
    root.style.setProperty('--secondary-accent', secondaryColor);
  }, [scale, font, primaryColor, secondaryColor]);
};
