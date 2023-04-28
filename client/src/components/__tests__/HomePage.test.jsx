import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
describe('HomePage buttons', () => {
  test('HomePage should render two buttons', () => {
    render(
      <HomePage>
        <button />
        <button />
      </HomePage>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});