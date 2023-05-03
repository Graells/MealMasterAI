import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "./Spinner";
import Profile from "./Profile";
import "../styles/DietUserDisplay.css";
import { ShareButton } from "./ShareButton";
import HomeIcon from "@mui/icons-material/Home";

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

        <h2 className="new-diet-display-h2-text">YOUR NEW DIET</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="dietDisplay">
            <pre>{lastCreatedDiet?.description}</pre>
            {lastCreatedDiet && (
              <div className="share-button-container">
                <span>Share it with others:</span>
                <br></br>
                <br></br>
                <ShareButton diet={lastCreatedDiet} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default DietUserDisplay;
