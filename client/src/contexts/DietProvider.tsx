import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, FC } from "react";
import { submitForm, addOne, getAll } from "../api.service";
import { DietContext } from "../App";
import { IDiet, PreviousDiet, FormDiet } from "../Interfaces";

const initialStateLastDiet: IDiet = {
  id:0,
  userId: "",
  user: {
    id:0,
    auth0Id:"",
    email:"",
    userName:"",
    userPic:"",
    meals:[]
  },
  description: "",
  createdAt: new Date(),
  mealInfoId: 0,
  mealInfo: {
    id:0,
    mealAI:[],
    title:"",
    name: "",
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    activityLevel: "",
    dietaryPreferences: "",
    weightGoal: "",
    weightAmount: 0,
    timeFrame: 0,
    eatingFrequency: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const DietProvider = ({ children }: { children: React.ReactNode }) => {
  const [diets, setDiets] = useState<IDiet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastCreatedDiet, setLastCreatedDiet] = useState<IDiet>(initialStateLastDiet);
  const [filteredDiets, setFilteredDiets] = useState(diets);

  const { user, isAuthenticated } = useAuth0();

  const handleMealSubmit = async (formData: FormDiet, onSuccess:any) => {
    console.log('formData', formData)
    console.log('onSuccess', onSuccess)

    setIsLoading(true);
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
      // await addOne(formData);
      setDiets([...diets, generatedDiet]);
      // console.log(prevDiets)
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
      value={{ diets, setDiets, handleMealSubmit, isLoading, lastCreatedDiet, filteredDiets, setFilteredDiets }}
    >
      {children}
    </DietContext.Provider>
  );
};

export default DietProvider;
