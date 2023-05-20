import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('useAuth0', useAuth0);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    {isAuthenticated && (
      <div className="profile-container profilehomepage">
        <img src={user?.picture} alt={user?.name} />
        <div className="info">
          {/* <h6>{user?.name}</h6> */}
          {/* <p>{user?.email}</p> */}
        </div>
        <LogoutButton />
      </div>
      
    )}
    </>
  );
};

export default Profile;
