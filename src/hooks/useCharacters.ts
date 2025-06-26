// Хук для удобной работы с персонажами
import { useCharactersStore } from '../store/charactersStore';

export const useCharacters = () => {
  const { characters, addCharacter } = useCharactersStore();
  return { characters, addCharacter };
};
