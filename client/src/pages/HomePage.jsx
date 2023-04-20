import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>

      <h1>MealMasterAI</h1>
      <Link to="/create-meal">
        <button>Create Meal</button>
      </Link>    
        <Link to="/diets">
        <button>Show All Diets</button>
      </Link>
    </div>
  );
};

export default HomePage;
