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

const StockOutContext = createContext(null);

export const StockOutProvider = ({ children }) => {
  const [stockOuts, setStockOuts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadStockOuts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStockOuts();

        setStockOuts(data);
      } catch (error) {
        console.error("Failed to load stock out records:", error);

        setError(
          error.message || "Failed to load stock out records.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadStockOuts();
  }, []);

  const addStockOut = async (stockOutData) => {
    try {
      setError("");

      const newStockOut = await createStockOut(stockOutData);

      setStockOuts((previousStockOuts) => [
        ...previousStockOuts,
        newStockOut,
      ]);

      return newStockOut;
    } catch (error) {
      setError(error.message || "Failed to add stock out.");

      throw error;
    }
  };

  return (
    <StockOutContext.Provider
      value={{
        stockOuts,
        loading,
        error,
        addStockOut,
      }}
    >
      {children}
    </StockOutContext.Provider>
  );
};

export const useStockOutContext = () => {
  const context = useContext(StockOutContext);

  if (!context) {
    throw new Error(
      "useStockOutContext must be used inside StockOutProvider.",
    );
  }

  return context;
};