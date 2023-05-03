import React from "react";
import { useContext, useState } from "react";
import { DietContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";
import "../styles/DietDisplay.css";
import { ShareButton } from "./ShareButton";
import { Link } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { IDiet } from "../Interfaces";

export interface DietProps {
  diet: IDiet;
  filteredDiets: IDiet[];
  setFilteredDiets: React.Dispatch<React.SetStateAction<IDiet[]>>;
}

const DietDisplay: React.FC<DietProps> = ({ diet, filteredDiets, setFilteredDiets }: DietProps) => {
  const { diets, setDiets } = useContext<any>(DietContext);
  const { user, isLoading } = useAuth0();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(diet.mealInfo.title);
  const [showDescription, setShowDescription] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
  // console.log("USER", user);
  
  const handleTitleEdit = async (newTitle: string) => {
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
        const updatedDiets = diets.map((d:IDiet) =>
        d.id === diet.id
        ? { ...d, mealInfo: { ...d.mealInfo, title: updatedMeal.title } }
        : d
        );
        setDiets(updatedDiets);
        
        const updatedFilteredDiets = filteredDiets.map((d:IDiet) =>
        d.id === diet.id
        ? { ...d, mealInfo: { ...d.mealInfo, title: updatedMeal.title } }
        : d
        );
        setFilteredDiets(updatedFilteredDiets);
      } else {
        const errorText = await response.text();
        console.error("Error updating meal title:", errorText);
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
        const updatedDiets = diets.filter((d:IDiet) => d.id !== diet.id);
        setDiets(updatedDiets);
        console.log('diets', diets)
        
        const updatedFilteredDiets = filteredDiets.filter((d:IDiet) => d.id !== diet.id);
        setFilteredDiets(updatedFilteredDiets);
      } else {
        const errorText = await response.text();
        console.error("Error deleting meal:", errorText);
      }
    } catch (error) {
      console.error("Error deleting diet:", error);
    }
  };

  const isCurrentUserOwner = user && diet.user.auth0Id === user.sub;

  return (
    <>
    <div className="dietDisplay">
      <div className="title-container">
        {isCurrentUserOwner && (
          <IoSettingsSharp
            className="options-icon"
            onClick={() => setShowOptions(!showOptions)}
            size={24}
          />
        )}
        {showOptions && isCurrentUserOwner && (
          <div className="options-container">
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
              <button onClick={() => setIsEditingTitle(true)}>
                Update title
              </button>
            )}
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this diet?")
                ) {
                  handleDelete();
                }
              }}
            >
              Delete
            </button>
          </div>
        )}

        <Link to={`/diet/${diet.id}`}>
          <h3>
            Diet title: {diet.mealInfo.title} for {diet.mealInfo.name}
          </h3>
        </Link>
        <button onClick={() => setShowDescription(!showDescription)}>
          Show diet
        </button>
      </div>
      <div>
        <h3>
          Goal: {diet.mealInfo.weightGoal.toLowerCase()}{" "}
          {diet.mealInfo.weightAmount} kg in {diet.mealInfo.timeFrame} weeks.
        </h3>
      </div>

      {showDescription && (
        <div className="share-container">
          <pre>{diet.description}</pre>
          <div className="share-button-container">
            <span>Share it with others:</span>
            <ShareButton diet={diet} />
          </div>
        </div>
      )}
      <div className="profile-container">
        <h3>By user:</h3>
        <img src={diet.user.userPic} alt={diet.user.userName} />
        <div className="info">
          <p className="dietUserStyle">{diet.user.userName}</p>
          <p>User email: {diet.user.email}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default DietDisplay;
