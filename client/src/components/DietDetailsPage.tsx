import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DietDisplay from "./DietDisplay";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { IDiet } from "../Interfaces";
import { useSelector } from "react-redux"

import { RootState } from "../store/store";


const DietDetailsPage: React.FC = () => {
  // Redux lines
  const diets = useSelector((state:RootState) => state.diets)

  const { dietId } = useParams<string>();
  const [ diet, setDiet ] = useState<IDiet | null>(null);
  
  useEffect(() => {
    const foundDiet = diets.find((d:IDiet) => d.id === Number(dietId));

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
        <button>Go to Dashboard</button>
      </Link>
      <div>
        <DietDisplay 
        diet={diet} 
        />
      </div>
    </>
  );
};

export default DietDetailsPage;
