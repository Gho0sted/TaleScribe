import { useJournalStore } from '../src/stores/journalStore';

describe('journal export', () => {
  it('stores note', () => {
    useJournalStore.getState().setNote('1', 'content');
    expect(useJournalStore.getState().notes['1']).toBe('content');
  });
});
