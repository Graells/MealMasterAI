import React, { useContext } from "react";
import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";

const DietsPage = () => {
  const { diets, isLoading } = useContext(DietContext);

  console.log(diets);

  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <h2>Dashboard: All Diets</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        diets.map((diet) => <DietDisplay key={diet.id} diet={diet} />)
      )}
    </div>
  );
};

export default DietsPage;

// import DietDisplay from "../components/DietDisplay";
// import { Link } from "react-router-dom";

// const DietsPage = ({ diets }) => {
//   return (
//     <div>
//       <Link to="/">
//         <button>Home</button>
//       </Link>
//       <h2>All Diets</h2>
//       {diets.map((diet) => (
//         <DietDisplay key={diet.id} diet={diet} />
//       ))}
//     </div>
//   );
// };

// export default DietsPage;
