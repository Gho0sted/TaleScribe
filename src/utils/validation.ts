/**
 * Common validation utilities for user data structures.
 * Общие функции валидации пользовательских данных.
 */
import { Character } from '../types';

export function validateCharacter(data: unknown): data is Character {
  if (!data || typeof data !== 'object') return false;
  const c = data as Record<string, unknown>;
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.class === 'string' &&
    typeof c.race === 'string'
  );
}
