export interface Subclass {
  name: string;
  description: string;
  features?: string[];
}

export interface ClassData {
  id: number;
  name: string;
  hitDie: string;
  primaryAbility: string;
  savingThrows: string;
  description: string;
  features: string[];
  subclasses: Subclass[];
  proficiencies: {
    armor: string;
    weapons: string;
    tools: string;
    savingThrows: string;
    skills: string;
  };
  hitPoints: {
    hitDie: string;
    firstLevel: string;
    higherLevels: string;
  };
  equipment: string[];
  image: string;
  color: string;
  icon: string;
  source: string;
  sourceCode: string;
}
