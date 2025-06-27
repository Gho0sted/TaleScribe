import { DiceUtils } from '../utils/DiceUtils';

self.addEventListener('message', (e: MessageEvent<{ count: number; sides: number; modifier: number }>) => {
  const { count, sides, modifier } = e.data;
  const result = DiceUtils.rollDice(count, sides, modifier);
  (self as DedicatedWorkerGlobalScope).postMessage(result);
});

export {};
