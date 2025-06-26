import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MapViewer from '../src/components/maps/MapViewer';
import { useMapStore } from '../src/stores/mapStore';

describe('MapViewer', () => {
  beforeEach(() => {
    useMapStore.setState({ background: '', markers: [], tokens: [] });
    localStorage.clear();
  });

  it('adds marker on click', () => {
    const { getByTestId } = render(<MapViewer />);
    fireEvent.click(getByTestId('map-area'), {
      clientX: 50,
      clientY: 50,
    });
    expect(useMapStore.getState().markers.length).toBe(1);
  });

  it('adds token from input', () => {
    const { getByPlaceholderText } = render(<MapViewer />);
    const input = getByPlaceholderText('Token image URL') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'token.png' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(useMapStore.getState().tokens.length).toBe(1);
  });
});
