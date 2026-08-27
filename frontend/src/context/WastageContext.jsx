import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWastages,
  createWastage,
  deleteWastage,
} from "../services/wastageService";

const WastageContext = createContext(null);

export const WastageProvider = ({ children }) => {
  const [wastages, setWastages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadWastages = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getWastages();

        setWastages(data);
      } catch (error) {
        console.error("Failed to load wastages:", error);

        setError(
          error.message || "Failed to load wastage records.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadWastages();
  }, []);

  const addWastage = async (wastageData) => {
    try {
      setError("");

      const newWastage =
        await createWastage(wastageData);

      setWastages((previousWastages) => [
        newWastage,
        ...previousWastages,
      ]);

      return newWastage;
    } catch (error) {
      console.error("Failed to create wastage:", error);

      throw new Error(
        error.message || "Failed to record wastage.",
      );
    }
  };

  const removeWastage = async (wastageId) => {
    try {
      setError("");

      await deleteWastage(wastageId);

      setWastages((previousWastages) =>
        previousWastages.filter(
          (wastage) => wastage.id !== wastageId,
        ),
      );
    } catch (error) {
      console.error("Failed to delete wastage:", error);

      throw new Error(
        error.message || "Failed to delete wastage.",
      );
    }
  };

  return (
    <WastageContext.Provider
      value={{
        wastages,
        loading,
        error,
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
    throw new Error(
      "useWastageContext must be used inside WastageProvider.",
    );
  }

  return context;
};