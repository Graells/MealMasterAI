import React from "react";
import { render, fireEvent, getByTestId, screen, window, getByLabelText, toHaveBeenCalledTimes, getByText } from "@testing-library/react";
import Profile from "../components/Profile";
import '@testing-library/jest-dom/extend-expect';
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock('@auth0/auth0-react');

describe("LoginButton", () => {

  beforeEach(() => {
    useAuth0.mockReturnValue({
       isAuthenticated: false, 
        loginWithRedirect: jest.fn() 
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders the Log In button when not authenticated", () => {

    const { getByText } = render(<LoginButton />);
    const button = getByText("Log In");

    expect(button).toBeInTheDocument();
  });

  test("Calls loginWithRedirect when the button is clicked", () => {
    const loginWithRedirect = jest.fn();
    useAuth0.mockReturnValue({ isAuthenticated: false, loginWithRedirect });

    const { getByText } = render(<LoginButton />);
    const button = getByText("Log In");

    fireEvent.click(button);

    expect(loginWithRedirect).toHaveBeenCalled();
  });

  test("Doesn't render the Log In button when authenticated", () => {
    useAuth0.mockReturnValue(
      { isAuthenticated: true }
    );

    const { queryByText } = render(<LoginButton />);
    const button = queryByText("Log In");

    expect(button).toBeNull();
  });
});