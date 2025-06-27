import { rollDice } from '../utils/diceShared';

self.addEventListener('message', (e: MessageEvent<{ count: number; sides: number; modifier: number }>) => {
  const { count, sides, modifier } = e.data;
  const rolls = rollDice(count, sides);
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier;
  (self as DedicatedWorkerGlobalScope).postMessage({
    rolls,
    total,
    modifier,
    formula: `${count}d${sides}${modifier !== 0 ? (modifier >= 0 ? `+${modifier}` : `${modifier}`) : ''}`,
  });
});

export {};
