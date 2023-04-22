import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

const CreateMealPage = () => {
  const { handleMealSubmit, isLoading } = useContext(DietContext);
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/diet-user-display");
  };

  const onMealFormSubmit = async (formData) => {
    await handleMealSubmit(formData, onSuccess);
  };

  return (
    <>
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
      <div className="footer">
        <Profile />
        <LogoutButton />
      </div>
    </>
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
