import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

const HomePage = () => {
  return (
    <div className="styleHomePage">
      <Link to="/">
        <button>refresh</button>
      </Link>
      <h1>MealMasterAI</h1>
      <div className="buttonGroup">
        <Link to="/create-meal">
          <button>Create Meal</button>
        </Link>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
      <div className="footer">
        <Profile />
        <LogoutButton />
      </div>
    </div>
  );
};

export default HomePage;
