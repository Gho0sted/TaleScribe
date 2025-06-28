import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ClassesComponent from '../src/components/classes/ClassesComponent';
import { vi } from 'vitest';

vi.mock('../src/hooks/useStoredState', () => ({
  __esModule: true,
  default: (key: string, initial: any) => [initial, vi.fn()],
}));
vi.mock('../src/hooks/useAppTranslation', () => ({
  useAppTranslation: () => ({
    t: (k: string) => {
      if (k === 'classes.searchPlaceholder') return 'Поиск...';
      return k;
    },
  }),
}));

describe('ClassesComponent filtering', () => {
  it('filters classes by search term', () => {
    render(<ClassesComponent />);
    const input = screen.getByPlaceholderText('Поиск...');
    fireEvent.change(input, { target: { value: 'варвар' } });
    expect(screen.getByText('Варвар')).toBeInTheDocument();
    expect(screen.queryByText('Бард')).not.toBeNull();
  });
});
