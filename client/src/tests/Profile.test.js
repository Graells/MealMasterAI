import React from "react";
import { render } from "@testing-library/react";
import Profile from "../components/Profile";
import '@testing-library/jest-dom/extend-expect';
import { useAuth0 } from "@auth0/auth0-react";

jest.mock('@auth0/auth0-react');


describe("Authentification window", () => {
  const user = {
    picture: "img",
    name: "Maria",
    email: "maria@some.com"
  };

  it('Shows the user profile when authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        name: 'Maria',
        email: 'maria@some.com',
        picture: 'img',
      },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    const { getByAltText, getByText } = render(<Profile />);

    expect(getByAltText('Maria')).toBeInTheDocument();
    expect(getByText('Maria')).toBeInTheDocument();
    expect(getByText('maria@some.com')).toBeInTheDocument();
  });

  it('renders a spinner when loading', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    const { container, querySelector } = render(<Profile />);
    const spinnerDiv = container.querySelector('.spinner');

    expect(spinnerDiv).toBeInTheDocument();
  });

  it('does not render the profile when not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    const { queryByAltText, queryByText } = render(<Profile />);

    expect(queryByAltText('Maria')).not.toBeInTheDocument();
    expect(queryByText('Maria')).not.toBeInTheDocument();
    expect(queryByText('maria@some.com')).not.toBeInTheDocument();
  });
})