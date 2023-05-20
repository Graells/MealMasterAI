import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <button
          data-cy="login-button"
          className="settings-buttons"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}
    </>
  );
};

export default LoginButton;
