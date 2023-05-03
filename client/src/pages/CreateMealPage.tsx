import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import "../styles/CreateMealPage.css";
// import logo from "../assets/MealMasterAILogo.png";
import PreviousDataItem from "../components/PreviousDataItem";
import {FormDiet} from "../Interfaces"

const CreateMealPage = () => {
  const { handleMealSubmit, isLoading, diets } = useContext(DietContext);
  const navigate = useNavigate();
  const logo = ""

  const onSuccess = () => {
    navigate("/diet-user-display");
  };

  const onMealFormSubmit = async (formData:FormDiet) => {
    await handleMealSubmit(formData, onSuccess);
  };

  return (
    <>
      <div className="createMealPage" style={{ paddingBottom: "80px" }}>
        <Link to="/">
          <img src="logMealMasterAILogo.png" alt="App Logo" className="app-logo" />
        </Link>

        <div className="form-and-data-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <CreateMealForm onMealSubmit={onMealFormSubmit} />
          )}

          {!isLoading && (
            <div className="previous-data-container">
              <h2 className="h2-background">Your previous input data</h2>
              <PreviousDataItem />
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <Profile />
      </div>
    </>
  );
};

export default CreateMealPage;
