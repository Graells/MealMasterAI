import React, { useContext } from "react";
import CreateMealForm from "../components/CreateMealForm";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";
import "../styles/CreateMealPage.css";
import PreviousDataItem from "../components/PreviousDataItem";
import {FormDiet} from "../Interfaces"
import { useAuth0 } from "@auth0/auth0-react";
import { IDiet } from "../Interfaces";
import { submitForm, addOne, getAll } from "../api.service";

import { useSelector } from "react-redux"
import { RootState } from "../store/store";
import { useDispatch } from 'react-redux'
import { setDiets } from "../store/dietsSlice";
import { setLoading } from "../store/loadingSlice";
import { setLastCreatedDiet } from "../store/lastCreatedDietSlice";

const CreateMealPage = () => {
  // Redux lines
  const diets = useSelector((state:RootState) => state.diets)
  const isLoading = useSelector((state:RootState) => state.loading)
  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const logo = ""

  const onSuccess = () => {
    navigate("/diet-user-display");
  };

  const { user, isAuthenticated } = useAuth0();

  const handleMealSubmit = async (formData: FormDiet, onSuccess:any) => {

    dispatch(setLoading(true));
    try {
      const userEmail = isAuthenticated && user ? user.email : null;
      const auth0Id = isAuthenticated && user ? user.sub : null;
      const userName = isAuthenticated && user ? user.name : null;
      const userPic = isAuthenticated && user ? user.picture : null;

      const generatedDiet = await submitForm(
        formData,
        auth0Id as string,
        userEmail as string,
        userName as string,
        userPic as string
      ) as IDiet;

      setDiets([...diets, generatedDiet]);

      dispatch(setLastCreatedDiet(generatedDiet));
      if (onSuccess) {
        dispatch(setLoading(false));
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onMealFormSubmit = async (formData:FormDiet) => {
    await handleMealSubmit(formData, onSuccess);
  };

  return (
    <>
      <div className="createMealPage" style={{ paddingBottom: "80px" }}>
        <Link to="/">
          <img src="MealMasterAILogo.png" alt="App Logo" className="app-logo" />
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
