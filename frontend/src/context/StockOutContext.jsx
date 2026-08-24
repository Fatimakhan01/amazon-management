import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStockOuts,
  createStockOut,
} from "../services/stockOutService";

const StockOutContext =
  createContext(null);

export const StockOutProvider = ({
  children,
}) => {
  const [stockOuts, setStockOuts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedStockOuts =
      getStockOuts();

    setStockOuts(storedStockOuts);
    setLoading(false);
  }, []);

  const addStockOut = (
    stockOutData
  ) => {
    const newStockOut =
      createStockOut(stockOutData);

    setStockOuts(
      (previousStockOuts) => [
        ...previousStockOuts,
        newStockOut,
      ]
    );

    return newStockOut;
  };

  return (
    <StockOutContext.Provider
      value={{
        stockOuts,
        loading,
        addStockOut,
      }}
    >
      {children}
    </StockOutContext.Provider>
  );
};

export const useStockOutContext = () => {
  const context =
    useContext(StockOutContext);

  if (!context) {
    throw new Error(
      "useStockOutContext must be used inside StockOutProvider."
    );
  }

  return context;
};