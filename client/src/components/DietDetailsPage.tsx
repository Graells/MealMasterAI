import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DietContext } from "../App";
import DietDisplay from "./DietDisplay";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const DietDetailsPage = () => {
  const { diets } = useContext(DietContext);
  const { dietId } = useParams();
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    const foundDiet = diets.find((d) => d.id === parseInt(dietId));
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
        <DietDisplay diet={diet} />
      </div>
    </>
  );
};

export default DietDetailsPage;
