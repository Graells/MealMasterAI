import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import "../styles/CreateMealPage.css";
import "../styles/ProfileComponent.css";
import HomeIcon from "@mui/icons-material/Home";
import PreviousDataItem from "../components/PreviousDataItem";
import Footer from "../components/Footer";

const CreateMealPage = () => {
  const { handleMealSubmit, isLoading, diets } = useContext(DietContext);
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/diet-user-display");
  };

  const onMealFormSubmit = async (formData: any) => {
    await handleMealSubmit(formData, onSuccess);
  };

  return (
    <div className="form-page-container">
      <div className="createMealPage">
        <div className="homelink">
          <Link to="/">
            <HomeIcon sx={{ color: "black" }} />
          </Link>
        </div>

        <div className="form-and-data-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <CreateMealForm onMealSubmit={onMealFormSubmit} />
          )}

          {!isLoading && (
            <div className="previous-data-container">
              <h4 className="h2-background">YOUR PREVIOUS DIET PLANS</h4>
              <PreviousDataItem />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateMealPage;
