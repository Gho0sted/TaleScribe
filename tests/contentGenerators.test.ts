import { useContentStore } from '../src/stores/useContentStore';

describe('content generators', () => {
  it('generates loot', () => {
    useContentStore.getState().generateLoot(5, []);
    expect(useContentStore.getState().loot.length).toBeGreaterThan(0);
  });

  it('generates event', () => {
    useContentStore.getState().generateEvent('weather');
    expect(useContentStore.getState().events[0].category).toBe('weather');
  });

  it('generates npc', () => {
    useContentStore.getState().generateNPC();
    const npc = useContentStore.getState().npcs[0];
    expect(npc.name).toBeTruthy();
    expect(npc.connections.length).toBeGreaterThan(0);
    expect(npc.voiceTraits).toBeTruthy();
  });
});
