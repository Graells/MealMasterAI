import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DietContext } from "../App";
import DietDisplay from "../components/DietDisplay";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const DietDetailsPage = () => {
  const cont = useContext(DietContext);
  console.log(cont)
  const { diets } = cont;
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
