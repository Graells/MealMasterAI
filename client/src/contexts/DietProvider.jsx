// DietProvider.js
import React, { useState, useEffect } from "react";
import { submitForm, addOne, getAll } from "../api.service";
import { DietContext } from "../App";

const DietProvider = ({ children }) => {
  const [diets, setDiets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMealSubmit = async (formData, onSuccess) => {
    setIsLoading(true);
    try {
      const generatedDiet = await submitForm(formData);
      await addOne(formData);
      setDiets((prevDiets) => [...prevDiets, generatedDiet]);
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
    <DietContext.Provider value={{ diets, handleMealSubmit, isLoading }}>
      {children}
    </DietContext.Provider>
  );
};

export default DietProvider;
