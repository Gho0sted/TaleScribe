import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
const CharactersPage = lazy(() => import('./pages/CharactersPage'));
import { useCommandPalette } from './hooks/useCommandPalette';
import { CommandPalette } from './components/CommandPalette';

// Основной роутер приложения
const AppRouter = () => {
  const palette = useCommandPalette();

  return (
    <div className="app">
      <nav>
        <a href="/" onClick={(e) => { e.preventDefault(); palette.setOpen(false); }}>Home</a>{' '}|
        <a href="/characters" onClick={(e) => { e.preventDefault(); palette.setOpen(false); }}>Characters</a>{' '}|
        <button onClick={() => palette.setOpen(!palette.open)}>Команды</button>
      </nav>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <CommandPalette palette={palette} />
    </div>
  );
};

export default AppRouter;
