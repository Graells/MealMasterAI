import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="styleHomePage" style={{ paddingBottom: "80px" }}>
        <Link to="/">
          <img src="MealMasterAILogo.png" alt="App Logo" className="app-logo" />
          {/* <button>refresh</button> */}
        </Link>
        <h1>MealMasterAI</h1>
        <div className="buttonGroup">
          <Link to="/create-meal">
            <button>Create Diet</button>
          </Link>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default HomePage;
