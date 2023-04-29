import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import { DietContext } from "../App";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import "../styles/CreateMealPage.css";
import HomeIcon from '@mui/icons-material/Home';
import PreviousDataItem from "../components/PreviousDataItem";

const CreateMealPage = () => {
  const { handleMealSubmit, isLoading, diets } = useContext(DietContext);
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/diet-user-display");
  };

  const onMealFormSubmit = async (formData) => {
    await handleMealSubmit(formData, onSuccess);
  };

  return (
    <>
    {/* <Link to="/">
          <HomeIcon/>
        </Link> */}
      <div className="createMealPage" >
        

        <div className="form-and-data-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <CreateMealForm onMealSubmit={onMealFormSubmit} />
          )}

          {!isLoading && (
            <div className="previous-data-container">
              <h3 className="h2-background">Your previous input data</h3>
              <PreviousDataItem />
            </div>
          )}
        </div>
      </div>
     
        <Profile />
      
    </>
  );
};

export default CreateMealPage;
