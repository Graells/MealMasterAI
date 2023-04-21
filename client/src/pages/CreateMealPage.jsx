import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";

const CreateMealPage = () => {
  const { handleMealSubmit, isLoading } = useContext(DietContext);
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/diets");
  };

  const onMealFormSubmit = async (formData) => {
    await handleMealSubmit(formData, onSuccess);
  };

  return (
    <div className="createMealPage">
      <Link to="/">
        <button>Home</button>
      </Link>
      {isLoading ? (
        <Spinner />
      ) : (
        <CreateMealForm onMealSubmit={onMealFormSubmit} />
      )}
    </div>
  );
};

export default CreateMealPage;

// import CreateMealForm from "../components/CreateMealForm";
// import { Link } from "react-router-dom";

// const CreateMealPage = ({ onMealSubmit }) => {
//   return (
//     <div className="createMealPage">
//       <Link to="/">
//         <button>Home</button>
//       </Link>
//       <CreateMealForm onMealSubmit={onMealSubmit} />
//     </div>
//   );
// };

// export default CreateMealPage;
