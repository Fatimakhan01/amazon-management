import { createContext, useContext, useEffect, useState } from "react";

import { getStockIns, createStockIn } from "../services/stockInService";

const StockInContext = createContext(null);

export const StockInProvider = ({ children }) => {
  const [stockIns, setStockIns] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedStockIns = getStockIns();

    setStockIns(storedStockIns);
    setLoading(false);
  }, []);

  const addStockIn = (stockInData) => {
    const newStockIn = createStockIn(stockInData);

    setStockIns((previousStockIns) => [...previousStockIns, newStockIn]);

    return newStockIn;
  };

  return (
    <StockInContext.Provider
      value={{
        stockIns,
        loading,
        addStockIn,
      }}
    >
      {children}
    </StockInContext.Provider>
  );
};

export const useStockInContext = () => {
  const context = useContext(StockInContext);

  if (!context) {
    throw new Error("useStockInContext must be used inside StockInProvider.");
  }

  return context;
};
