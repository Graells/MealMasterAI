import React, { useContext } from "react";
import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

const DietsPage = () => {
  const { diets, isLoading } = useContext(DietContext);

  console.log("DIETS DietsPage", diets);

  return (
    <>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <h2>Dashboard: All Diets from all Users</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          diets.map((diet) => <DietDisplay key={diet.id} diet={diet} />)
        )}
      </div>
      <div className="footer">
        <Profile />
        <LogoutButton />
      </div>
    </>
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
