import { act } from '@testing-library/react';
import { useMapStore } from '../src/stores/mapStore';

describe('map store', () => {
  beforeEach(() => {
    useMapStore.setState({ background: '', markers: [], tokens: [] });
    localStorage.clear();
  });

  it('adds and removes markers', () => {
    act(() => {
      useMapStore.getState().addMarker(0.5, 0.5);
    });
    expect(useMapStore.getState().markers.length).toBe(1);
    const id = useMapStore.getState().markers[0].id;
    act(() => {
      useMapStore.getState().removeMarker(id);
    });
    expect(useMapStore.getState().markers.length).toBe(0);
  });

  it('updates marker position', () => {
    act(() => {
      useMapStore.getState().addMarker(0.1, 0.1);
    });
    const id = useMapStore.getState().markers[0].id;
    act(() => {
      useMapStore.getState().updateMarker(id, 0.2, 0.2);
    });
    const m = useMapStore.getState().markers[0];
    expect(m.x).toBeCloseTo(0.2);
    expect(m.y).toBeCloseTo(0.2);
  });

  it('persists state', () => {
    act(() => {
      useMapStore.getState().addMarker(0.5, 0.5);
    });
    expect(localStorage.getItem('map-store')).toBeTruthy();
  });
});
