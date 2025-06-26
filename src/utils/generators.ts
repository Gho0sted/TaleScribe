import { generateId } from './character';

export const createCharacter = (name: string) => ({ id: generateId(), name });
