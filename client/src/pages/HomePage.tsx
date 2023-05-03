import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import "../styles/HomePage.css";
import logo from "../assets/MealMasterAILogo.png";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <div className="styleHomePage" style={{ paddingBottom: "80px" }}>
        {/* <Link to="/">
          <img src={logo} alt="App Logo" className="app-logo" />
          <button>refresh</button> 
        </Link>*/}
        <h1>MEALMASTER AI</h1>
        <div className="buttonGroup">
          <Link to="/create-meal">
            <button data-cy="create-meal-nav-link" className="homebtn">
              <RestaurantIcon className="RestaurantIcon" />
              Create Diet
            </button>
          </Link>

          <div className="space"></div>

          <Link to="/dashboard">
            <button data-cy="dashboard-nav-link" className="homebtn">
              <DashboardIcon className="DashboardIcon" />
              Dashboard
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
