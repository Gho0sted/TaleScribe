import { vi, describe, it, expect } from 'vitest';
import { DiceUtils } from '../src/utils/DiceUtils';

vi.mock('../src/utils/diceShared', () => ({
  rollDice: () => [3, 4],
}));

describe('DiceUtils', () => {
  it('calculates modifier', () => {
    expect(DiceUtils.getModifier(15)).toBe(2);
    expect(DiceUtils.getModifier(8)).toBe(-1);
  });

  it('formats modifier string', () => {
    expect(DiceUtils.formatModifier(3)).toBe('+3');
    expect(DiceUtils.formatModifier(-2)).toBe('-2');
  });

  it('rollDice uses worker', () => {
    const res = DiceUtils.rollDice(2, 6, 1);
    expect(res.total).toBe(8); // 3 + 4 + 1
    expect(res.rolls).toEqual([3, 4]);
    expect(res.modifier).toBe(1);
  });
});
