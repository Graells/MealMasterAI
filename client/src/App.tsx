import React from "react";
import { BrowserRouter, Routes, Route, RouteProps  } from "react-router-dom";
import CreateMealPage from "./pages/CreateMealPage";
import DietsPage from "./pages/DietsPage";
import HomePage from "./pages/HomePage";
import DietProvider from "./contexts/DietProvider";
import LoginPage from "./pages/LoginPage";
import DietUserDisplay from "./components/DietUserDisplay";
import DietDetailsPage from "./components/DietDetailsPage";
import { PreviousDiet, IDiet, FormDiet } from "./Interfaces";


interface DietContext {
  diets: IDiet[],
  setDiets: React.Dispatch<React.SetStateAction<IDiet[] | []>>
  handleMealSubmit:(formData: FormDiet, onSuccess:any)=>void,
  isLoading: boolean,
  lastCreatedDiet: IDiet,
  filteredDiets:IDiet[],
  setFilteredDiets:any
}

const DietContext = React.createContext<DietContext>({
  diets: [],
  setDiets:()=>{},
  handleMealSubmit:()=>{},
  isLoading: false,
  lastCreatedDiet: {} as IDiet,
  filteredDiets:[],
  setFilteredDiets:null
});

const App = () => {
  return (
    <DietProvider>
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
    </DietProvider>
  );
};

export default App;
export { DietContext };
