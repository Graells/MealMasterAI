import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DietDisplay from "../components/DietDisplay";
import "@testing-library/jest-dom/extend-expect";


describe("DietDisplay", () => {
  const mockDiet = {
    id: "1",
    mealInfo: {
      title: "Test Diet",
      name: "Test Name",
      weightGoal: "Test Goal",
      weightAmount: "10",
      timeFrame: "12",
    },
    user: {
      auth0Id: "abc123",
    },
    description: "Test description",
  };

  it("Renders the diet title and goal", () => {
    render(<DietDisplay diet={mockDiet} />);
    expect(screen.getByText(/Diet title: Test Diet for Test Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Goal: Test Goal 10 kg in 12 weeks/i)).toBeInTheDocument();
  });

  it("Shows and hides the diet description when the show button is clicked", () => {
    render(<DietDisplay diet={mockDiet} />);
    const showButton = screen.getByText(/show diet/i);
    fireEvent.click(showButton);
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    fireEvent.click(showButton);
    expect(screen.queryByText(/Test description/i)).not.toBeInTheDocument();
  });

  it("Shows and hides the options when the settings icon is clicked", () => {
    render(<DietDisplay diet={mockDiet} />);
    const settingsIcon = screen.getByTestId("settings-icon");
    fireEvent.click(settingsIcon);
    expect(screen.getByText(/update title/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    fireEvent.click(settingsIcon);
    expect(screen.queryByText(/update title/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
  });
});