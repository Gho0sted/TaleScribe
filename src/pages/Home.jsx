// Домашняя страница
// Главная страница приложения
import React from 'react';
import { useCharactersStore } from '../stores/charactersStore';
import { useThemeStore } from '../stores/themeStore';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useBackgroundSync } from '../hooks/useBackgroundSync';

export const Home = () => {
  const { characters } = useCharactersStore();
  const { accentColor, currentAccent } = useThemeStore();
  const isOnline = useOnlineStatus();
  const { isInstallable, install } = usePWAInstall();
  const { syncData } = useBackgroundSync();

  return (
    <div>
      <h2>Добро пожаловать в Talescribe!</h2>
      <p>Статус сети: {isOnline ? 'online' : 'offline'}</p>
      {isInstallable && (
        <button onClick={install}>Установить приложение</button>
      )}
      <button onClick={syncData}>Синхронизировать данные</button>
      <p>Текущий акцент: {accentColor}</p>
      <ul>
        {characters.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};
