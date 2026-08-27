import { createContext, useContext, useEffect, useState } from "react";

import { getReportStats } from "../services/reportService";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [reportStats, setReportStats] = useState({
    inventoryStats: {
      totalProducts: 0,
      totalStock: 0,
      inventoryCost: 0,
      inventoryValue: 0,
      lowStockProducts: 0,
      outOfStockProducts: 0,
    },
    salesStats: {
      totalOrders: 0,
      revenue: 0,
      completedOrders: 0,
      pendingOrders: 0,
      cancelledOrders: 0,
    },
    stockMovementStats: {
      totalStockIn: 0,
      totalStockOut: 0,
      netMovement: 0,
    },
    wastageStats: {
      totalWastageQuantity: 0,
      totalWastageLoss: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReportStats();

      setReportStats(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch report statistics.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <ReportContext.Provider
      value={{
        ...reportStats,
        loading,
        error,
        fetchReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error(
      "useReportContext must be used inside ReportProvider.",
    );
  }

  return context;
};