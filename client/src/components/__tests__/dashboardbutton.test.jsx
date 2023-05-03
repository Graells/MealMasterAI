import {describe,expect,test} from 'vitest';
import {render, screen} from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';
import LoginButton from '../LoginButton';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";


describe("Login Page buttons", () => {
    test("LoginPage should render two buttons", () => {
      render(
        <LoginPage>
          <LoginButton />
          <button />
        </LoginPage>,
        {wrapper: BrowserRouter}
      );
  
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });


  // // login button
  // test('It redirects the user to the Auth0 Universal Login page when the Log In button is pressed', async () => {
  //   const { loginWithRedirect } = useAuth0();

  //   render(<App />);
  //   const loginElement = screen.getByText("Log In");
  //   loginElement.click();  

  //   await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
  // });


