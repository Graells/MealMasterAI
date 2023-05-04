import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DietContext } from '../../App';
import DietUserDisplay from '../DietUserDisplay';

describe('DietUserDisplay', () => {
  test('renders the user\'s new diet when loaded', () => {
    const mockDiet = { description: 'Mock diet description' };
    render(
      <DietContext.Provider value={{ lastCreatedDiet: mockDiet, isLoading: false }}>
        <DietUserDisplay />
      </DietContext.Provider>
    );

    expect(screen.getByText('YOUR NEW DIET')).toBeDefined();
    expect(screen.getByText(mockDiet.description)).toBeDefined();
  });

  test('renders a loading spinner when diet is loading', () => {
    render(
      <DietContext.Provider value={{ isLoading: true }}>
        <DietUserDisplay />
      </DietContext.Provider>
    );

    expect(screen.getByTestId('spinner')).toBeDefined();
  });
});
