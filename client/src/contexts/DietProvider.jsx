import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { submitForm, addOne, getAll } from "../api.service";
import { DietContext } from "../App";

const DietProvider = ({ children }) => {
  const [diets, setDiets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCreatedDiet, setLastCreatedDiet] = useState({});

  const { user, isAuthenticated } = useAuth0();
  console.log("USER AUTH0", user);
  const handleMealSubmit = async (formData, onSuccess) => {
    setIsLoading(true);
    try {
      const userEmail = isAuthenticated && user ? user.email : null;
      const auth0Id = isAuthenticated && user ? user.sub : null;
      const userName = isAuthenticated && user ? user.name : null;
      const userPic = isAuthenticated && user ? user.picture : null;

      const generatedDiet = await submitForm(
        formData,
        auth0Id,
        userEmail,
        userName,
        userPic
      );
      await addOne(formData);
      setDiets((prevDiets) => [...prevDiets, generatedDiet]);
      setLastCreatedDiet(generatedDiet);
      if (onSuccess) {
        setIsLoading(false);
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    setIsLoading(true);
    const diets = await getAll();
    setDiets(diets);
    setIsLoading(false);
  };

  return (
    <DietContext.Provider
      value={{ diets, handleMealSubmit, isLoading, lastCreatedDiet }}
    >
      {children}
    </DietContext.Provider>
  );
};

export default DietProvider;
