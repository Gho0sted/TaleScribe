// Страница с персонажами
import React, { useState } from 'react';
import { useCharactersStore } from '../stores/charactersStore';
import { Plus } from 'lucide-react';

export const CharactersPage = () => {
  const { characters, addCharacter } = useCharactersStore();
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    addCharacter({ id: Date.now().toString(), name });
    setName('');
  };

  return (
    <div>
      <h2>Персонажи</h2>
      <div>
        <input
          placeholder="Имя персонажа"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd} style={{ marginLeft: 8 }}>
          <Plus size={16} /> Добавить
        </button>
      </div>
      <ul>
        {characters.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};
