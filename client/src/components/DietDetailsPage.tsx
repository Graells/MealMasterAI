import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DietDisplay from "./DietDisplay";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { MealInfo, User } from "./DietDisplay";
import { DietContext } from "../App";

export interface Diet {
  id: number;
  mealInfo: MealInfo;
  user: User;
  description: string;
}

interface DietContextType {
  diets: Diet[];
}

// const DietContext = React.createContext<DietContextType>({ diets: [] });

const DietDetailsPage: React.FC = () => {
  const { diets } = useContext(DietContext);
  const { dietId } = useParams<{ dietId: string }>();
  const [diet, setDiet] = useState<Diet | null>(null);

  useEffect(() => {
    console.log("diets in details page", diets, dietId);
    const foundDiet = diets.find((d) => d.id === parseInt(dietId ?? "0", 10));
    if (foundDiet) {
      setDiet(foundDiet);
    }
  }, [diets, dietId]);

  useEffect(() => {
    console.log("diets in details page", diets, dietId);
  }, [diets]);

  if (!diet) {
    return <Spinner />;
  }

  return (
    <>
      <Link to="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
      <div>
        <DietDisplay diet={diet} />
      </div>
    </>
  );
};

export default DietDetailsPage;
