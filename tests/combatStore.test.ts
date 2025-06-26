import { act } from '@testing-library/react';
import { useCombatStore } from '../src/stores/combatStore';

describe('combat store', () => {
  it('reorders combatants', () => {
    useCombatStore.setState({
      combatants: [
        { id: '1', name: 'A', initiative: 15, statuses: [] },
        { id: '2', name: 'B', initiative: 10, statuses: [] },
      ],
      currentIndex: 0,
      turnSeconds: 30,
    });
    act(() => {
      useCombatStore.getState().reorderCombatants(0, 1);
    });
    const ids = useCombatStore.getState().combatants.map((c) => c.id);
    expect(ids).toEqual(['2', '1']);
  });

  it('advances turn and removes expired status', () => {
    useCombatStore.setState({
      combatants: [
        { id: '1', name: 'A', initiative: 15, statuses: [{ id: 's1', name: 'Poison', icon: '', duration: 1 }] },
        { id: '2', name: 'B', initiative: 10, statuses: [] },
      ],
      currentIndex: 0,
      turnSeconds: 30,
    });
    act(() => {
      useCombatStore.getState().nextTurn();
    });
    expect(useCombatStore.getState().currentIndex).toBe(1);
    expect(useCombatStore.getState().combatants[0].statuses.length).toBe(0);
  });
});
