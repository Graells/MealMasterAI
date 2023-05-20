import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/PreviousDataItem.css";
import { IDiet } from "../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface IVisibleDetails {
  [id: string]: boolean;
}

const PreviousDataItem = () => {
  // Redux lines
  const diets = useSelector((state: RootState) => state.diets);

  const { user } = useAuth0();
  const [visibleDetails, setVisibleDetails] = useState<IVisibleDetails>({});
  const toggleDetails = (id: string) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="previous-data-item">
      {diets.map((data: IDiet) => {
        const isCurrentUserOwner = user && data.user.auth0Id === user.sub;
        return (
          isCurrentUserOwner && (
            <div key={data.id}>
              <h3
                onClick={() => toggleDetails(String(data.id))}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {data.mealInfo.title} for {data.mealInfo.name}
              </h3>
              {visibleDetails[data.id] && (
                <>
                  <p>Name: {data.mealInfo.name}</p>
                  <p>Age: {data.mealInfo.age}</p>
                  <p>Gender: {data.mealInfo.gender}</p>
                  <p>Weight: {data.mealInfo.weight} kg</p>
                  <p>Height: {data.mealInfo.height} cm</p>
                  <p>Activity Level: {data.mealInfo.activityLevel}</p>
                  <p>Dietary Preferences: {data.mealInfo.dietaryPreferences}</p>
                  <p>Weight Goal: {data.mealInfo.weightGoal} kg</p>
                  <p>Weight Amount: {data.mealInfo.weightAmount} kg</p>
                  <p>Time Frame: {data.mealInfo.timeFrame} weeks</p>
                  <p>
                    Eating Frequency: {data.mealInfo.eatingFrequency} meals per
                    day
                  </p>
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
