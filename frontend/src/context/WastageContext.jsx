import { createContext, useContext, useEffect, useState } from "react";

import {getWastages,createWastage,deleteWastage,} from "../services/wastageService";

const WastageContext = createContext(null);

export const WastageProvider = ({ children }) => {
  const [wastages, setWastages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWastages = getWastages();

    setWastages(storedWastages);

    setLoading(false);
  }, []);

  const addWastage = (wastageData) => {
    const newWastage = createWastage(wastageData);

    setWastages((previousWastages) => [...previousWastages, newWastage]);

    return newWastage;
  };

  const removeWastage = (wastageId) => {
    const updatedWastages = deleteWastage(wastageId);

    setWastages(updatedWastages);
  };

  return (
    <WastageContext.Provider
      value={{
        wastages,
        loading,
        addWastage,
        removeWastage,
      }}
    >
      {children}
    </WastageContext.Provider>
  );
};

export const useWastageContext = () => {
  const context = useContext(WastageContext);

  if (!context) {
    throw new Error("useWastageContext must be used inside WastageProvider.");
  }

  return context;
};
