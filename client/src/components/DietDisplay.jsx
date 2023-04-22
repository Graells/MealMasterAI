import React from "react";
import { useContext } from 'react';
import { DietContext } from '../App';


const DietDisplay = ({ diet }) => {
  const { diets, setDiets } = useContext(DietContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/meals/${diet.id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        const updatedDiets = diets.filter((d) => d.id !== diet.id);
        setDiets(updatedDiets);
      } else {
        // Handle any errors
      }
    } catch (error) {
      console.error('Error deleting diet:', error);
    }
  };

  return (
    <div className="dietDisplay">
      <div className="profile-container">
      <h3>Diet plan from:</h3>
        <img src={diet.user.userPic} alt={diet.user.userName} />
        <div className="info">
          <p>User name: {diet.user.userName}</p>
          <p>User email: {diet.user.email}</p>
        </div>
      </div>
      <pre>{diet.description}</pre>
      <button onClick={handleDelete}>Delete</button>
      
    </div>
  );
};

export default DietDisplay;
