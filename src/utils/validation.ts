import { Character } from '../types';

export function validateCharacter(data: any): data is Character {
  if (!data || typeof data !== 'object') return false;
  return (
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.class === 'string' &&
    typeof data.race === 'string'
  );
}
