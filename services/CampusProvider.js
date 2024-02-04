import React, { createContext, useContext, useState } from 'react';
const CampusContext = createContext();

export const CampusProvider = ({ children }) => {
  const [selectedCampus, setSelectedCampus] = useState(null);

  return (
    <CampusContext.Provider value={{ selectedCampus, setSelectedCampus }}>
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};