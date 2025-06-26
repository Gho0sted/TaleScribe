import { act } from '@testing-library/react';
import { useSessionStore } from '../src/stores/sessionStore';

describe('session store', () => {
  it('adds session', () => {
    act(() => {
      useSessionStore.getState().addSession({ title: 'test', description: '', start: '2023-01-01', end: '2023-01-01' });
    });
    expect(useSessionStore.getState().sessions.length).toBe(1);
  });
});
