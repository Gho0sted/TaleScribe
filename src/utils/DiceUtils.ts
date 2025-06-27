import { Character, DiceRoll } from '../types';

export class DiceUtils {
  static getModifier(score: number): number {
    return Math.floor((score - 10) / 2);
  }

  static getProficiencyBonus(level: number): number {
    return Math.ceil(level / 4) + 1;
  }

  static rollDice(count: number, sides: number, modifier: number = 0): Omit<DiceRoll, 'id' | 'timestamp'> {
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier;
    return {
      rolls,
      total,
      modifier,
      formula: `${count}d${sides}${modifier !== 0 ? this.formatModifier(modifier) : ''}`,
    };
  }

  static rollDiceAsync(
    count: number,
    sides: number,
    modifier: number = 0
  ): Promise<Omit<DiceRoll, 'id' | 'timestamp'>> {
    const worker = new Worker(new URL('../workers/DiceWorker.ts', import.meta.url), { type: 'module' });
    return new Promise((resolve) => {
      worker.addEventListener('message', (e) => {
        resolve(e.data);
        worker.terminate();
      });
      worker.postMessage({ count, sides, modifier });
    });
  }

  static formatModifier(modifier: number): string {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }

  static calculateSkillModifier(character: Character, skillId: string): number {
    const skillsData = [
      { id: 'acrobatics', ability: 'dexterity' },
      { id: 'animalHandling', ability: 'wisdom' },
      { id: 'arcana', ability: 'intelligence' },
      { id: 'athletics', ability: 'strength' },
      { id: 'deception', ability: 'charisma' },
      { id: 'history', ability: 'intelligence' },
      { id: 'insight', ability: 'wisdom' },
      { id: 'intimidation', ability: 'charisma' },
      { id: 'investigation', ability: 'intelligence' },
      { id: 'medicine', ability: 'wisdom' },
      { id: 'nature', ability: 'intelligence' },
      { id: 'perception', ability: 'wisdom' },
      { id: 'performance', ability: 'charisma' },
      { id: 'persuasion', ability: 'charisma' },
      { id: 'religion', ability: 'intelligence' },
      { id: 'sleightOfHand', ability: 'dexterity' },
      { id: 'stealth', ability: 'dexterity' },
      { id: 'survival', ability: 'wisdom' },
    ];

    const skill = skillsData.find((s) => s.id === skillId);
    if (!skill) return 0;

    const abilityMod = this.getModifier(character.abilityScores[skill.ability as keyof typeof character.abilityScores]);
    const profBonus = character.skills?.[skillId] ? character.proficiencyBonus : 0;
    return abilityMod + profBonus;
  }

  static calculateSavingThrowModifier(character: Character, abilityId: string): number {
    const abilityMod = this.getModifier(character.abilityScores[abilityId as keyof typeof character.abilityScores]);
    const profBonus = character.savingThrows?.[abilityId] ? character.proficiencyBonus : 0;
    return abilityMod + profBonus;
  }

  static calculatePassivePerception(character: Character): number {
    return 10 + this.calculateSkillModifier(character, 'perception');
  }
}
