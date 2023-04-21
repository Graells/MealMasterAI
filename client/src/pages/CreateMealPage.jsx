import CreateMealForm from "../components/CreateMealForm";
import { Link } from "react-router-dom";

const CreateMealPage = ({ onMealSubmit }) => {
  return (
    <div className="createMealPage">
      <Link to="/">
        <button>Home</button>
      </Link>
      <CreateMealForm onMealSubmit={onMealSubmit} />
    </div>
  );
};

export default CreateMealPage;
