import React, { useContext } from "react";
import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import logo from "../assets/MealMasterAILogo.png";

const DietsPage = () => {
  const { diets, isLoading } = useContext(DietContext);

  console.log("DIETS DietsPage", diets);

  return (
    <>
      <div style={{ paddingBottom: "80px" }}>
        <Link to="/">
          <img src={logo} alt="App Logo" className="app-logo" />
          {/* <button>Home</button> */}
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
      </div>
    </>
  );
};

export default DietsPage;
