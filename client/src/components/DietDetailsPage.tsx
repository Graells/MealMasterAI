import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DietContext } from "../App";
import DietDisplay from "./DietDisplay";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { IDiet } from "../Interfaces";

// interface Params {
//   dietId: string;
// }

const DietDetailsPage: React.FC = () => {
  const { diets } = useContext(DietContext);
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
        diet={diet} />
      </div>
    </>
  );
};

export default DietDetailsPage;
