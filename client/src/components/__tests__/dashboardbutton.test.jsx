import {describe,expect,test} from 'vitest';
import {render, screen} from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';
import LoginButton from '../LoginButton';
import {BrowserRouter} from 'react-router-dom';



describe("Login Page buttons", () => {
    test("LoginPage should render A Login button and a Dashboard button", () => {
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


  

