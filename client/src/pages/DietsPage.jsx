import DietDisplay from "../components/DietDisplay";
import { Link } from "react-router-dom";

const DietsPage = ({ diets }) => {
  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <h2>All Diets</h2>
      {diets.map((diet) => (
        <DietDisplay key={diet.id} diet={diet} />
      ))}
    </div>
  );
};

export default DietsPage;
