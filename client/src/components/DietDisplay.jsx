import React from "react";

const DietDisplay = ({ diet }) => {
  return (
    <div className="dietDisplay">
      <h2>{diet.name} diet plan:</h2>
      <pre>{diet.description}</pre>
      <div className="profile-container">
        <img src={diet.user.userPic} alt={diet.user.userName} />
        <div className="info">
          <p>User email: {diet.user.email}</p>
          <p>User name: {diet.user.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default DietDisplay;
