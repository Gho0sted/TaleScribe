export const LOOT_TABLES = {
  common: [
    { id: 'potionHealing', name: 'Healing Potion', type: 'potion', value: 50 },
    { id: 'shortSword', name: 'Short Sword', type: 'weapon', value: 10 }
  ],
  rare: [
    { id: 'ringProtection', name: 'Ring of Protection', type: 'artifact', value: 1000 },
    { id: 'longSwordPlus1', name: 'Longsword +1', type: 'weapon', value: 500 }
  ],
  epic: [
    { id: 'staffPower', name: 'Staff of Power', type: 'artifact', value: 5000 },
    { id: 'vorpalSword', name: 'Vorpal Sword', type: 'weapon', value: 7000 }
  ]
} as const;

export type LootTableKey = keyof typeof LOOT_TABLES;
