// Хук для удобной работы с персонажами
import { useCharactersStore } from '../stores/charactersStore';

export const useCharacters = () => {
  const { characters, addCharacter } = useCharactersStore();
  return { characters, addCharacter };
};
