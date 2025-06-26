import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { HomePage } from './pages/HomePage';
import { CharactersPage } from './pages/CharactersPage';
import { useCommandPalette } from './hooks/useCommandPalette';
import { CommandPalette } from './components/layout/CommandPalette';

const AppRouter = () => {
  const palette = useCommandPalette();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <nav>
        <a href="/" onClick={(e) => { e.preventDefault(); palette.setOpen(false); }}>Home</a>{' '}|
        <a href="/characters" onClick={(e) => { e.preventDefault(); palette.setOpen(false); }}>Characters</a>{' '}|
        <button onClick={() => palette.setOpen(!palette.open)}>Команды</button>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CommandPalette palette={palette} />
    </div>
  );
};

export default AppRouter;
