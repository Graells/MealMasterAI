import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/MealMasterAILogo.png";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="login-container">
        <img src={logo} alt="App Logo" className="app-logo" />
        <h1>MealMasterAI</h1>
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    )
  );
};

export default LoginButton;
