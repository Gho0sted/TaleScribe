/**
 * Общая логика броска кубиков
 * (вместо того, чтобы DiceUtils импортировал worker,
 * и worker — DiceUtils)
 */
export function rollDice(count: number, sides: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }
  return results;
}
