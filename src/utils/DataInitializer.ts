import { Character, Spell, BestiaryCreature, Item, Edition } from '../types';

export class DataInitializer {
  static getInitialCharacters(edition: Edition): Character[] {
    return [
      {
        id: '1',
        name: 'Эларион Звездочёт',
        class: 'wizard',
        race: 'elf',
        level: 16,
        edition: edition,
        abilityScores: {
          strength: 10,
          dexterity: 16,
          constitution: 14,
          intelligence: 20,
          wisdom: 12,
          charisma: 13,
        },
        skills: {
          arcana: true,
          history: true,
          investigation: true,
          perception: true,
        },
        savingThrows: {
          intelligence: true,
          wisdom: true,
        },
        hitPoints: {
          current: 86,
          max: 86,
          temporary: 0,
        },
        armorClass: 15,
        speed: 30,
        proficiencyBonus: 5,
        background: 'Hermit',
        alignment: 'Chaotic Good',
        experience: 225000,
        notes:
          'Эльф-волшебник, специализирующийся на школе прорицания. Изучает звезды и предсказывает будущее.',
        spells: ['fireball', 'magic-missile', 'healing-word'],
        hitDice: {
          current: 16,
          max: 16,
          type: 6,
        },
        inspiration: true,
        passivePerception: 16,
        initiative: 3,
        spellSlots: {
          1: { max: 4, current: 4 },
          2: { max: 3, current: 3 },
          3: { max: 3, current: 3 },
          4: { max: 3, current: 2 },
          5: { max: 2, current: 1 },
          6: { max: 1, current: 1 },
          7: { max: 1, current: 0 },
          8: { max: 1, current: 1 },
          9: { max: 1, current: 0 },
        },
        currency: {
          copper: 0,
          silver: 0,
          electrum: 0,
          gold: 250,
          platinum: 10,
        },
        inventory: [
          {
            id: '1',
            name: 'Посох силы',
            quantity: 1,
            weight: 4,
            value: 25000,
            type: 'weapon',
            equipped: true,
            attuned: true,
            description: 'Магический посох с кристаллом',
          },
          {
            id: '2',
            name: 'Заклинательная книга',
            quantity: 1,
            weight: 3,
            value: 50,
            type: 'misc',
            equipped: false,
            description: 'Содержит записанные заклинания',
          },
          {
            id: '3',
            name: 'Мантия защиты',
            quantity: 1,
            weight: 4,
            value: 1000,
            type: 'armor',
            equipped: true,
            description: '+1 к КД и спасброскам',
          },
        ],
        deathSaves: {
          successes: 0,
          failures: 0,
        },
        conditions: [],
        relationships: [],
      },
    ];
  }

  static getInitialSpells(edition: Edition): Spell[] {
    return [
      {
        id: 'fireball',
        name: 'Огненный шар',
        level: 3,
        school: 'evocation',
        castingTime: '1 действие',
        range: '150 футов',
        components: 'В, С, М (крошечный шарик серы и гуано летучей мыши)',
        duration: 'Мгновенно',
        description:
          'Яркая полоса света вспыхивает от вашего указательного пальца к точке, которую вы выбираете в пределах дистанции, где взрывается огненный цветок. Каждое существо в сфере радиусом 20 футов с центром в этой точке должно совершить спасбросок Ловкости. При провале цель получает урон огнем 8к6, а при успехе — половину этого урона.',
        classes: ['wizard', 'sorcerer'],
        edition: edition,
        ritual: false,
        concentration: false,
      },
      {
        id: 'magic-missile',
        name: 'Магическая стрела',
        level: 1,
        school: 'evocation',
        castingTime: '1 действие',
        range: '120 футов',
        components: 'В, С',
        duration: 'Мгновенно',
        description:
          'Вы создаете три светящиеся стрелы магической силы. Каждая стрела попадает в существо по вашему выбору, которое вы можете видеть в пределах дистанции. Стрела наносит 1к4 + 1 урона силовым полем цели. Стрелы попадают одновременно, и вы можете направить их в одну цель или в разные.',
        classes: ['wizard', 'sorcerer'],
        edition: edition,
        ritual: false,
        concentration: false,
      },
    ];
  }

  static getInitialBestiary(edition: Edition): BestiaryCreature[] {
    return [
      {
        id: 'goblin',
        name: 'Гоблин',
        size: 'Small',
        type: 'humanoid',
        alignment: 'Neutral Evil',
        armorClass: 15,
        hitPoints: { average: 7, dice: '2d6' },
        speed: { walk: 30 },
        abilityScores: {
          strength: 8,
          dexterity: 14,
          constitution: 10,
          intelligence: 10,
          wisdom: 8,
          charisma: 8,
        },
        savingThrows: {},
        skills: { stealth: 6 },
        senses: 'darkvision 60 ft., passive Perception 9',
        languages: 'Common, Goblin',
        challengeRating: '1/4',
        actions: [
          {
            name: 'Scimitar',
            description:
              'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.',
          },
          {
            name: 'Shortbow',
            description:
              'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
          },
        ],
        edition: edition,
      },
    ];
  }

  static getInitialItems(edition: Edition): Item[] {
    return [
      {
        id: 'longsword',
        name: 'Длинный меч',
        type: 'weapon',
        rarity: 'common',
        weight: 3,
        value: 15,
        damage: '1d8',
        damageType: 'slashing',
        properties: ['versatile (1d10)'],
        description: 'Боевое оружие ближнего боя',
        edition: edition,
      },
      {
        id: 'healing-potion',
        name: 'Зелье лечения',
        type: 'potion',
        rarity: 'common',
        weight: 0.5,
        value: 50,
        effect: 'Восстанавливает 2d4+2 хитов',
        properties: [],
        description: 'Магическое зелье красного цвета',
        edition: edition,
      },
    ];
  }
}
