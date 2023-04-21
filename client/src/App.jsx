import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateMealPage from "./pages/CreateMealPage";
import DietsPage from "./pages/DietsPage";
import HomePage from "./pages/HomePage";
import DietProvider from "./contexts/DietProvider";
import LoginPage from "./pages/LoginPage";

const DietContext = React.createContext();

const App = () => {
  return (
    <DietProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-meal" element={<CreateMealPage />} />
          <Route path="/diets" element={<DietsPage />} />
        </Routes>
      </BrowserRouter>
    </DietProvider>
  );
};

export default App;
export { DietContext };

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { submitForm, addOne, getAll } from "./api.service";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import CreateMealPage from "./pages/CreateMealPage";
// import DietsPage from "./pages/DietsPage";
// import HomePage from "./pages/HomePage";

// const App = () => {
//   const [diets, setDiets] = useState([]);
//   const handleMealSubmit = async (formData) => {
//     try {
//       const generatedDiet = await submitForm(formData);
//       await addOne(formData);
//       setDiets(generatedDiet);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Handle the error, e.g., display an error message to the user
//     }
//   };
//   useEffect(() => {
//     fetchDiets();
//   }, []);
//   const fetchDiets = async () => {
//     const diets = await getAll();
//     setDiets(diets);
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<HomePage />} />
//         <Route
//           path="/create-meal"
//           element={
//             <CreateMealPage
//               // isLoading={isLoading}
//               onMealSubmit={handleMealSubmit}
//             />
//           }
//         />
//         <Route path="/diets" element={<DietsPage diets={diets} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
