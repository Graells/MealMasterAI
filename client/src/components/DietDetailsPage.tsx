import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DietDisplay from "./DietDisplay";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { MealInfo, User } from "./DietDisplay";
import { DietContext } from "../App";
import DashboardIcon from "@mui/icons-material/Dashboard";

export interface Diet {
  id: number;
  mealInfo: MealInfo;
  user: User;
  description: string;
}

interface DietContextType {
  diets: Diet[];
}

const DietDetailsPage: React.FC = () => {
  const { diets } = useContext(DietContext);
  const { dietId } = useParams<{ dietId: string }>();
  const [diet, setDiet] = useState<Diet | null>(null);

  useEffect(() => {
    const foundDiet = diets.find((d) => d.id === parseInt(dietId ?? "0", 10));
    if (foundDiet) {
      setDiet(foundDiet);
    }
  }, [diets, dietId]);

  if (!diet) {
    return <Spinner />;
  }

  return (
    <>
      <Link to="/dashboard">
        <button className="settings-buttons">
          <DashboardIcon className="DashboardIcon" />
          Dashboard
        </button>
      </Link>
      <div>
        <DietDisplay diet={diet} />
      </div>
    </>
  );
};

export default DietDetailsPage;
