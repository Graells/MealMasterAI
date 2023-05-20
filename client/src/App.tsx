import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, RouteProps  } from "react-router-dom";
import CreateMealPage from "./pages/CreateMealPage";
import DietsPage from "./pages/DietsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DietUserDisplay from "./components/DietUserDisplay";
import DietDetailsPage from "./components/DietDetailsPage";
import { PreviousDiet, IDiet, FormDiet } from "./Interfaces";
import { getAll } from "./api.service";

import { useDispatch } from 'react-redux'
import { setDiets } from "./store/dietsSlice";
import { setLoading } from "./store/loadingSlice";
import { setFilteredDiets } from "./store/filteredDietsSlice";


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    dispatch(setLoading(true));
    const diets = await getAll();
    dispatch(setDiets(diets));
    dispatch(setFilteredDiets(diets));
    dispatch(setLoading(false));
  };

  return (
    
    // <DietProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-meal" element={<CreateMealPage />} />
          <Route path="/dashboard" element={<DietsPage />} />
          <Route path="/diet-user-display" element={<DietUserDisplay />} />
          <Route path="/diet/:dietId" element={<DietDetailsPage  />} />
        </Routes>
      </BrowserRouter>
    // </DietProvider>
  );
};

export default App;
// export { DietContext };
