import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplierService";

const SupplierContext = createContext(null);

export const SupplierProvider = ({
  children,
}) => {
  const [suppliers, setSuppliers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getSuppliers();

        setSuppliers(data);
      } catch (error) {
        setError(
          error.message ||
            "Failed to load suppliers.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  const addSupplier = async (
    supplierData,
  ) => {
    try {
      setError("");

      const newSupplier =
        await createSupplier(
          supplierData,
        );

      setSuppliers(
        (previousSuppliers) => [
          newSupplier,
          ...previousSuppliers,
        ],
      );

      return newSupplier;
    } catch (error) {
      setError(error.message);

      throw error;
    }
  };

  const editSupplier = async (
    supplierId,
    supplierData,
  ) => {
    try {
      setError("");

      const updatedSupplier =
        await updateSupplier(
          supplierId,
          supplierData,
        );

      setSuppliers(
        (previousSuppliers) =>
          previousSuppliers.map(
            (supplier) =>
              supplier.id ===
              supplierId
                ? updatedSupplier
                : supplier,
          ),
      );

      return updatedSupplier;
    } catch (error) {
      setError(error.message);

      throw error;
    }
  };

  const removeSupplier = async (
    supplierId,
  ) => {
    try {
      setError("");

      await deleteSupplier(
        supplierId,
      );

      setSuppliers(
        (previousSuppliers) =>
          previousSuppliers.filter(
            (supplier) =>
              supplier.id !==
              supplierId,
          ),
      );
    } catch (error) {
      setError(error.message);

      throw error;
    }
  };

  const value = {
    suppliers,
    loading,
    error,
    addSupplier,
    editSupplier,
    removeSupplier,
  };

  return (
    <SupplierContext.Provider
      value={value}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplierContext = () => {
  const context =
    useContext(SupplierContext);

  if (!context) {
    throw new Error(
      "useSupplierContext must be used inside SupplierProvider",
    );
  }

  return context;
};