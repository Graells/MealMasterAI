import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom/extend-expect";


jest.mock("@auth0/auth0-react");

describe("LogoutButton", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders the Log Out button when authenticated", () => {
    const { queryByText } = render(<LogoutButton />);
    const button = queryByText("Log Out");

    expect(button).toBeInTheDocument();
  });

  test("Calls logoutParams when the button is clicked", () => {
    const logout = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout,
      loginWithRedirect: jest.fn(),
    });

    const { queryByText } = render(<LogoutButton />);
    const button = queryByText("Log Out");

    fireEvent.click(button);

    expect(logout).toHaveBeenCalled();
  });

  test("Doesn't render the Log Out button when not authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
    });

    const { queryByText } = render(<LogoutButton />);
    const button = queryByText("Log Out");

    expect(button).toBeNull();
  });
});
