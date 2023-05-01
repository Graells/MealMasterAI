import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateMealPage from "./pages/CreateMealPage";
import DietsPage from "./pages/DietsPage";
import HomePage from "./pages/HomePage";
import DietProvider from "./contexts/DietProvider";
import LoginPage from "./pages/LoginPage";
import DietUserDisplay from "./components/DietUserDisplay";
import DietDetailsPage from "./components/DietDetailsPage";
import { Diet } from "./components/DietDetailsPage"

interface DietContextType {
  diets: Diet[];
  setDiets: React.Dispatch<React.SetStateAction<Diet[]>>;
  handleMealSubmit: (formData: FormData, onSuccess?: () => void) => void;
  isLoading: boolean;
  lastCreatedDiet: Diet;
}


export const DietContext = createContext<DietContextType | undefined>(undefined);

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
          <Route path="/diet/:dietId" element={<DietDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </DietProvider>
  );
};

export default App;
// export { DietContext };
