import { Character } from './character';

export interface ThemeState {
  theme: string;
  accentColor: string;
  currentAccent: { [k: string]: string };
}

export interface CharactersState {
  characters: Character[];
}
