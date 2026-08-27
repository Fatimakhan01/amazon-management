import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStockIns,
  createStockIn,
} from "../services/stockInService";

const StockInContext = createContext(null);

export const StockInProvider = ({ children }) => {
  const [stockIns, setStockIns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStockIns = async () => {
      try {
        const data = await getStockIns();
        setStockIns(data);
      } catch (error) {
        console.error(
          "Failed to load stock in records:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    loadStockIns();
  }, []);

  const addStockIn = async (stockInData) => {
    const newStockIn = await createStockIn(stockInData);

    setStockIns((previousStockIns) => [
      newStockIn,
      ...previousStockIns,
    ]);

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
    throw new Error(
      "useStockInContext must be used inside StockInProvider.",
    );
  }

  return context;
};