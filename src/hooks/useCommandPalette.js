// Логика командной палитры
import { useState, useMemo } from 'react';
import { Home as HomeIcon, Users, Moon, Palette } from 'lucide-react';
import { useAppNavigation } from './useAppNavigation';
import { useThemeStore } from '../stores/themeStore';

const createCommand = (id, label, action, icon) => ({ id, label, action, icon });

export const useCommandPalette = () => {
  const { navigateTo } = useAppNavigation();
  const { toggleTheme, setAccentColor } = useThemeStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const commands = useMemo(
    () => [
      createCommand('nav-home', 'Домой', () => navigateTo('/'), HomeIcon),
      createCommand('nav-chars', 'Персонажи', () => navigateTo('/characters'), Users),
      createCommand('theme', 'Сменить тему', toggleTheme, Moon),
      createCommand('accent-indigo', 'Индиго', () => setAccentColor('indigo'), Palette),
      createCommand('accent-purple', 'Фиолетовый', () => setAccentColor('purple'), Palette),
    ],
    [navigateTo, toggleTheme, setAccentColor]
  );

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(search.toLowerCase())),
    [commands, search]
  );

  return { open, setOpen, search, setSearch, commands: filtered };
};
