// Global application store types
// Типы глобального хранилища приложения
import { Character } from './index';

export interface ThemeState {
  theme: string;
  accentColor: string;
  currentAccent: { [k: string]: string };
}

export interface CharactersState {
  characters: Character[];
}
