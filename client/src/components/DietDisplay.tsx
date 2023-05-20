import React, { ReactNode, useContext, useEffect, useState } from "react";
import { DietContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";
import "../styles/DietDisplay.css";
import { ShareButton } from "./ShareButton";
import { Link } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export interface User {
  auth0Id: string;
  userPic: string;
  userName: string;
  email: string;
}

export interface MealInfo {
  age: ReactNode;
  gender: ReactNode;
  weight: ReactNode;
  height: ReactNode;
  activityLevel: ReactNode;
  dietaryPreferences: any;
  eatingFrequency: ReactNode;
  title: string;
  name: string;
  weightGoal: string;
  weightAmount: number;
  timeFrame: number;
}

export interface Diet {
  id: number;
  mealInfo: MealInfo;
  user: User;
  description: string;
}

export interface DietDisplayProps {
  diet: Diet;
  filteredDiets?: Diet[];
  setFilteredDiets?: (diets: Diet[]) => void;
}

const DietDisplay: React.FC<DietDisplayProps> = ({
  diet,
  filteredDiets,
  setFilteredDiets,
}) => {
  const { diets, setDiets } = useContext(DietContext);
  const { user, isLoading } = useAuth0();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(diet.mealInfo.title);
  const [showDescription, setShowDescription] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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
        const updatedDiets = diets.map((d: any) =>
          d.id === diet.id
            ? { ...d, mealInfo: { ...d.mealInfo, title: updatedMeal.title } }
            : d
        );
        setDiets(updatedDiets);

        const updatedFilteredDiets = filteredDiets?.map((d) =>
          d.id === diet.id
            ? { ...d, mealInfo: { ...d.mealInfo, title: updatedMeal.title } }
            : d
        );
        setFilteredDiets ? updatedFilteredDiets : null;
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
        const updatedDiets = diets.filter((d: any) => d.id !== diet.id);
        setDiets(updatedDiets);

        const updatedFilteredDiets = filteredDiets?.filter(
          (d) => d.id !== diet.id
        );
        setFilteredDiets ? updatedFilteredDiets : null;
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
    <div className="dietDisplay">
      <div className="title-container">
        {isCurrentUserOwner && (
          <IoSettingsSharp
            className="options-icon"
            onClick={() => setShowOptions(!showOptions)}
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
                <button className="settings-buttons" type="submit">
                  SUBMIT
                </button>
              </form>
            ) : (
              <button
                className="settings-buttons"
                onClick={() => setIsEditingTitle(true)}
              >
                UPDATE TITLE
              </button>
            )}
            <br></br>
            <button
              className="settings-buttons"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this diet?")
                ) {
                  handleDelete();
                }
              }}
            >
              DELETE
            </button>
            <br></br>
          </div>
        )}

        <Link to={`/diet/${diet.id}`}>
          <h3 className="title-display">
            {diet.mealInfo.title} for {diet.mealInfo.name}
          </h3>
        </Link>
        <div className="show-diet-button-container">
        <button
          className="show-diet-button"
          onClick={() => setShowDescription(!showDescription)}
        >
          <RestaurantIcon className="RestaurantIcon" />
          SHOW DIET
        </button>
        </div>
      </div>
      <div>
        <h5>
          Goal: {diet.mealInfo.weightGoal.toLowerCase()}{" "}
          {diet.mealInfo.weightAmount} kg in {diet.mealInfo.timeFrame} weeks.
        </h5>
      </div>

      {showDescription && (
        <div className="share-container">
          <pre>{diet.description}</pre>
          <br></br>
          <br></br>
          <div className="share-button-container">
            <span>Share it with others:</span>
            <br></br>
            <br></br>
            <ShareButton diet={diet} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DietDisplay;
