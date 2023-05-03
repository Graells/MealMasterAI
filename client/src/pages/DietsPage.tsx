import React, { useContext, useState, useEffect } from "react";
import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/DropdownMenu.css";
import "../styles/DietsPage.css";
import Footer from "../components/Footer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DietsPage = () => {
  const { diets, isLoading } = useContext(DietContext);
  const [filteredDiets, setFilteredDiets] = useState(diets);

  const filterByUser = (userEmail: String) => {
    if (userEmail === "") {
      setFilteredDiets(diets);
    } else {
      const filtered = diets.filter((diet) => diet.user.email === userEmail);
      setFilteredDiets(filtered);
    }
  };

  useEffect(() => {
    console.log("DIETS DietsPage", diets, isLoading);
  }, [diets, isLoading]);

  const getUniqueUsers = () => {
    const userEmails = diets.map((diet) => diet.user.email);
    return [...new Set(userEmails)];
  };

  return (
    <>
      <div style={{ paddingBottom: "80px" }}>
        <div className="homelink">
          <Link to="/">
            <HomeIcon sx={{ color: "black" }} />
          </Link>
        </div>

        <div className="select-container">
          <select 
          data-cy="diet-link"
          onChange={(e) => filterByUser(e.target.value)} style={{}}>
            <option className="selectUsers" value="">
              <KeyboardArrowDownIcon className="KeyboardArrowDownIcon" />
              ALL USERS
            </option>
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

      <Footer />
    </>
  );
};

export default DietsPage;
