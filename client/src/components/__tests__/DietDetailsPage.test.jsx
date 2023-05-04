import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import DietDetailsPage from '../DietDetailsPage';
import { BrowserRouter } from 'react-router-dom';
import { DietContext } from '../../App';

describe('DietDetailsPage', () => {
  test('DietDetailsPage should render a Spinner when diet is not found', () => {
    render(
      <DietContext.Provider value={{ diets: [] }}>
        <BrowserRouter>
          <DietDetailsPage />
        </BrowserRouter>
      </DietContext.Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('DietDetailsPage should render DietDisplay and Dashboard button when diet is found', () => {
    const mockDiet = {
      id: 1,
      mealInfo: { title: 'Test' },
      user: { name: 'Test Name' },
      description: 'Test Meal',
    };

    render(
      <DietContext.Provider value={{ diets: [mockDiet] }}>
        <BrowserRouter>
          <DietDetailsPage />
        </BrowserRouter>
      </DietContext.Provider>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('diet-display')).toBeInTheDocument();
  });
});
