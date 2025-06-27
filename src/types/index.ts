export type Edition = '5e' | '3.5e' | 'pathfinder' | 'pf2e';

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface HitPoints {
  current: number;
  max: number;
  temporary: number;
}

export interface HitDice {
  current: number;
  max: number;
  type: number;
}

export interface SpellSlot {
  max: number;
  current: number;
}

export interface SpellSlots {
  [level: number]: SpellSlot;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  value: number;
  type: 'weapon' | 'armor' | 'misc' | 'consumable' | 'tool';
  equipped?: boolean;
  attuned?: boolean;
  description: string;
}

export interface Currency {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

export interface DeathSaves {
  successes: number;
  failures: number;
}

export interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  level: number;
  edition: Edition;
  avatar?: string;
  abilityScores: AbilityScores;
  skills: Record<string, boolean>;
  savingThrows: Record<string, boolean>;
  hitPoints: HitPoints;
  armorClass: number;
  speed: number;
  proficiencyBonus: number;
  background?: string;
  alignment?: string;
  experience?: number;
  notes?: string;
  spells: string[];
  hitDice: HitDice;
  inspiration: boolean;
  passivePerception: number;
  initiative: number;
  spellSlots?: SpellSlots;
  currency: Currency;
  inventory: InventoryItem[];
  deathSaves: DeathSaves;
  conditions: string[];
  relationships: string[];
}

export interface CharacterClass {
  id: string;
  name: string;
  hitDie: number;
  primaryAbility: string;
  icon: string;
  spellcaster: boolean;
}

export interface Race {
  name: string;
  bonuses: Record<string, number>;
  size: 'Small' | 'Medium' | 'Large';
  speed: number;
  languages: string[];
  description: string;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
  edition: Edition;
  ritual: boolean;
  concentration: boolean;
}

export interface SpellSchool {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Skill {
  id: string;
  name: string;
  ability: keyof AbilityScores;
  icon: string;
}

export interface AbilityScore {
  id: keyof AbilityScores;
  name: string;
  short: string;
  description: string;
  icon: string;
}

export interface DiceRoll {
  id: number;
  rolls: number[];
  total: number;
  modifier: number;
  formula: string;
  label?: string;
  timestamp: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface DNDEdition {
  id: Edition;
  name: string;
  fullName: string;
  icon: string;
  color: string;
  description: string;
}

export interface BestiaryCreature {
  id: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armorClass: number;
  hitPoints: { average: number; dice: string };
  speed: Record<string, number>;
  abilityScores: AbilityScores;
  savingThrows: Record<string, number>;
  skills: Record<string, number>;
  senses: string;
  languages: string;
  challengeRating: string;
  actions: Array<{ name: string; description: string }>;
  edition: Edition;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'misc' | 'tool';
  rarity:
    | 'common'
    | 'uncommon'
    | 'rare'
    | 'very rare'
    | 'legendary'
    | 'artifact';
  weight: number;
  value: number;
  damage?: string;
  damageType?: string;
  armorClass?: number;
  properties: string[];
  description: string;
  edition: Edition;
  effect?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  dmId: string;
  playerIds: string[];
  characters: string[];
  currentSession: number;
  notes: string;
  edition: Edition;
  createdAt: string;
  updatedAt: string;
}
