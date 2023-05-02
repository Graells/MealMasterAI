import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "./Spinner";
import Profile from "./Profile";
import "../styles/DietUserDisplay.css";
import { ShareButton } from "./ShareButton";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";

const DietUserDisplay = () => {
  const { lastCreatedDiet, isLoading } = useContext(DietContext);

  return (
    <>
      <div>
        <div className="homelink">
          <Link to="/">
            <HomeIcon sx={{ color: "black" }} />
          </Link>
        </div>

        <h2 className="h2-background">Your new Diet</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="dietDisplay">
            <pre>{lastCreatedDiet?.description}</pre>
            {lastCreatedDiet && (
              <div>
                <span>Share it with others:</span>
                <ShareButton diet={lastCreatedDiet} />
              </div>
            )}
          </div>
        )}
        <Link to="/dashboard">
          <button className="homebtn">
            <DashboardIcon className="DashboardIcon" />
            Dashboard
          </button>
        </Link>
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default DietUserDisplay;
