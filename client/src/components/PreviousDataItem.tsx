import { useContext, useState } from "react";
import { DietContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/PreviousDataItem.css";
import React from "react";
import { Diet } from "./DietDisplay";

interface MealInfo {
  title: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  dietaryPreferences: string[];
  weightGoal: number;
  weightAmount: number;
  timeFrame: number;
  eatingFrequency: number;
}

interface DietData {
  id: number;
  mealInfo: MealInfo;
  user: {
    auth0Id: string;
  };
}

interface VisibleDetails {
  [key: number]: boolean;
}

const PreviousDataItem: React.FC = () => {
  const { diets }: { diets: Diet[] } = useContext(DietContext);
  const { user } = useAuth0();
  const [visibleDetails, setVisibleDetails] = useState<VisibleDetails>({});

  const toggleDetails = (id: number) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div data-testid="your-previous-data" className="previous-data-item">
      {diets.map((data: Diet) => {
        const isCurrentUserOwner = user && data.user.auth0Id === user.sub;
        return (
          isCurrentUserOwner && (
            <div key={data.id}>
              <p
                onClick={() => toggleDetails(data.id)}
                style={{ cursor: "pointer" }}
              >
                {data.mealInfo.title} for {data.mealInfo.name}
              </p>
              {visibleDetails[data.id] && (
                <>
                  {" "}
                  <div className="PreviousDietDetails">
                    <p>Name: {data.mealInfo.name}</p>
                    <p>Age: {data.mealInfo.age}</p>
                    <p>Gender: {data.mealInfo.gender}</p>
                    <p>Weight: {data.mealInfo.weight} kg</p>
                    <p>Height: {data.mealInfo.height} cm</p>
                    <p>Activity Level: {data.mealInfo.activityLevel}</p>
                    <p>
                      Dietary Preferences: {data.mealInfo.dietaryPreferences}
                    </p>
                    <p>Weight Goal: {data.mealInfo.weightGoal} kg</p>
                    <p>Weight Amount: {data.mealInfo.weightAmount} kg</p>
                    <p>Time Frame: {data.mealInfo.timeFrame} weeks</p>
                    <p>
                      Eating Frequency: {data.mealInfo.eatingFrequency} meals
                      per day
                    </p>
                  </div>
                </>
              )}
            </div>
          )
        );
      })}
    </div>
  );
};

export default PreviousDataItem;
