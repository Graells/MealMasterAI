import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import "../styles/CreateMealPage.css";
import logo from "../assets/MealMasterAILogo.png";

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
      <div className="createMealPage" style={{ paddingBottom: "80px" }}>
        <Link to="/">
          <img src={logo} alt="App Logo" className="app-logo" />
          {/* <button>Home</button> */}
        </Link>

        {isLoading ? (
          <Spinner />
        ) : (
          <CreateMealForm onMealSubmit={onMealFormSubmit} />
        )}
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default CreateMealPage;
