import React, { useContext, useState } from "react";
import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
// import logo from "../assets/MealMasterAILogo.png";
import "../styles/DropdownMenu.css";
const DietsPage = () => {
  const { diets, isLoading, filteredDiets, setFilteredDiets } = useContext(DietContext);


  const filterByUser = (userEmail:string) => {
    if (userEmail === "") {
      setFilteredDiets(diets);
    } else {
      const filtered = diets.filter((diet) => diet.user.email === userEmail);
      setFilteredDiets(filtered);
    }
  };
  const getUniqueUsers = () => {
    const userEmails = diets.map((diet) => diet.user.email);
    return [...new Set(userEmails)];
  };
  

  console.log("DIETS DietsPage", diets);

  return (
    <>
      <div style={{ paddingBottom: "80px" }}>
        <Link to="/">
          <img src="MealMasterAILogo.png" alt="App Logo" className="app-logo" />
        </Link>
        <h2 className="h2-background">Dashboard: All Diets from all Users</h2>
        <div className="select-container">
          <select
            onChange={(e) => filterByUser(e.target.value)}
            style={{ marginBottom: "20px" }}
          >
            <option value="">All Users</option>
            {getUniqueUsers().map((userEmail) => (
              <option key={userEmail} value={userEmail}>
                {userEmail}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          filteredDiets.map((diet) => (
            <DietDisplay
              key={diet.id}
              diet={diet}
              filteredDiets={filteredDiets}
              setFilteredDiets={setFilteredDiets}
            />
          ))
        )}
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default DietsPage;
