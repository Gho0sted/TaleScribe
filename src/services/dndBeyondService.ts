import { Character, Spell } from '../types';

export async function syncCharacters(apiKey: string): Promise<Character[]> {
  const res = await fetch('https://api.dndbeyond.com/v1/characters', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error('Failed to sync characters');
  const data = await res.json();
  return data.characters as Character[];
}

export async function syncSpells(apiKey: string): Promise<Spell[]> {
  const res = await fetch('https://api.dndbeyond.com/v1/spells', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error('Failed to sync spells');
  const data = await res.json();
  return data.spells as Spell[];
}
