// Домашняя страница
// Главная страница приложения
import React from 'react';
import { useCharactersStore } from '../stores/charactersStore';
import { useThemeStore } from '../stores/themeStore';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const Home = () => {
  const { characters } = useCharactersStore();
  const { accentColor, currentAccent } = useThemeStore();
  const isOnline = useOnlineStatus();
  const { isInstallable, install } = usePWAInstall();

  return (
    <div>
      <h2>Добро пожаловать в Talescribe!</h2>
      <p>Статус сети: {isOnline ? 'online' : 'offline'}</p>
      {isInstallable && (
        <button onClick={install}>Установить приложение</button>
      )}
      <p>Текущий акцент: {accentColor}</p>
      <ul>
        {characters.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};
