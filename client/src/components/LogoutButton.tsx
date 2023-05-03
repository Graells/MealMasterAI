import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <button
          className="settings-buttons"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <LogoutIcon className="LogoutIcon" />
          Log Out
        </button>
      )}
    </>
  );
};

export default LogoutButton;
