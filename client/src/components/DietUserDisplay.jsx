import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "./Profile";
import "../styles/DietUserDisplay.css";
import { ShareButton } from "./ShareButton";


const DietUserDisplay = () => {
  const { lastCreatedDiet, isLoading } = useContext(DietContext);

  return (
    <>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <h2 className="h2-background">Your new Diet</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="dietDisplay">
            <pre>{lastCreatedDiet.description}</pre>
            <div>
              <span>Share it with others:</span>
              <ShareButton diet={lastCreatedDiet} />
            </div>
          </div>
        )}
        <Link to="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default DietUserDisplay;
