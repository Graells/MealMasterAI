import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="styleHomePage">
      <h1>MealMasterAI</h1>
      <div className="buttonGroup">
        <Link to="/create-meal">
          <button>Create Meal</button>
        </Link>
        <Link to="/diets">
          <button>Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
