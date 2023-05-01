import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button
        className="logoutbtn"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    )
  );
};

export default LogoutButton;
