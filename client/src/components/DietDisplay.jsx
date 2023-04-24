import React from "react";
import { useContext, useState } from "react";
import { DietContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";

const DietDisplay = ({ diet }) => {
  const { diets, setDiets } = useContext(DietContext);
  const { user, isLoading } = useAuth0();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(diet.mealInfo.title);
  const [showDescription, setShowDescription] = useState(false);

  console.log("USER", user);

  const handleTitleEdit = async (newTitle) => {
    try {
      const response = await fetch(`http://localhost:3001/meals/${diet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: diet.id, title: newTitle }),
      });

      if (response.ok) {
        const updatedMeal = await response.json();
        const updatedDiets = diets.map((d) =>
          d.id === diet.id
            ? { ...d, mealInfo: { ...d.mealInfo, title: updatedMeal.title } }
            : d
        );
        setDiets(updatedDiets);
      } else {
        // Handle any errors
        console.error("Error updating meal title");
      }
    } catch (error) {
      console.error("Error updating meal title:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/meals/${diet.id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        const updatedDiets = diets.filter((d) => d.id !== diet.id);
        setDiets(updatedDiets);
      } else {
      }
    } catch (error) {
      console.error("Error deleting diet:", error);
    }
  };

  const isCurrentUserOwner = user && diet.user.auth0Id === user.sub;

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
      <div className="title-container">
        {isEditingTitle ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditingTitle(false);
              handleTitleEdit(title);
            }}
          >
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          isCurrentUserOwner && (
            <button onClick={() => setIsEditingTitle(true)}>
              Update title
            </button>
          )
        )}
        <h3>Diet title: {diet.mealInfo.title}</h3>
        <button onClick={() => setShowDescription(!showDescription)}>
          Show diet
        </button>
      </div>

      {showDescription && <pre>{diet.description}</pre>}

      {isCurrentUserOwner && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default DietDisplay;
