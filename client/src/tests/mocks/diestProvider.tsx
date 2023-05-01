import React, { useState } from 'react';

export const DietContext = React.createContext({
  diets: []
});

export const DietProvider = ({ children }) => {
  const [diets, setDiets] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastCreatedDiet, setLastCreatedDiet] = useState<{}>({});



  return (
    <DietContext.Provider value={{ diets, isLoading, lastCreatedDiet, setDiets }}>
      {children}
    </DietContext.Provider>
  );
};