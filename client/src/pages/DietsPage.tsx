import React, { useContext, useState } from "react";
import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import HomeIcon from '@mui/icons-material/Home';
import "../styles/DropdownMenu.css";
const DietsPage = () => {
  const { diets, isLoading } = useContext(DietContext);
  const [filteredDiets, setFilteredDiets] = useState(diets);

  const filterByUser = (userEmail : String) => {
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
      <div className="homelink">
        <Link to="/">
          <HomeIcon sx={{color: 'black'}}/>
        </Link> 
        </div>
        <h3 className="h2-background" style={{ height: "50vh", width: "65vw"}} >Dashboard: All Diets from all Users</h3>
        <div className="select-container">
          <select
            onChange={(e) => filterByUser(e.target.value)}
            style={{ height: "50px", width: "65vw", marginBottom: "20px" , padding: "10px"}}
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
      
        <Profile />
      
    </>
  );
};

export default DietsPage;
