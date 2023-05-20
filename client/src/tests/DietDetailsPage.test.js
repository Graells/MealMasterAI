import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import "@testing-library/jest-dom/extend-expect";
import DietDetailsPage from "../components/DietDetailsPage";


jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mockDiets = [
  { id: 1, name: "Test Diet 1", meals: [] },
  { id: 2, name: "Test Diet 2", meals: [] },
];

describe("DietDetailsPage", () => {
  beforeEach(() => {
    useSelector.mockClear();
  });

  it("should display the DietDisplay component when the diet is loaded", async () => {
    useSelector.mockReturnValue(mockDiets);

    const { getByText } = render(<DietDetailsPage />);
    await waitFor(() => {
      expect(getByText("Test Diet 1")).toBeInTheDocument();
    });
  });
});
