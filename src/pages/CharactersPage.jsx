// Страница с персонажами
import React from 'react';
import { useCharactersStore } from '../stores/charactersStore';

export const CharactersPage = () => {
  const { characters } = useCharactersStore();
  return (
    <div>
      <h2>Персонажи</h2>
      <pre>{JSON.stringify(characters, null, 2)}</pre>
    </div>
  );
};
