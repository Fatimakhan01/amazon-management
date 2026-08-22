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

const SupplierContext =
  createContext(null);

export const SupplierProvider = ({
  children,
}) => {
  const [suppliers, setSuppliers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedSuppliers =
      getSuppliers();

    setSuppliers(storedSuppliers);
    setLoading(false);
  }, []);

  const addSupplier = (
    supplierData
  ) => {
    const newSupplier =
      createSupplier(supplierData);

    setSuppliers((previousSuppliers) => [
      ...previousSuppliers,
      newSupplier,
    ]);
  };

  const editSupplier = (
    supplierId,
    supplierData
  ) => {
    const updatedSupplier =
      updateSupplier(
        supplierId,
        supplierData
      );

    setSuppliers((previousSuppliers) =>
      previousSuppliers.map((supplier) =>
        supplier.id === supplierId
          ? updatedSupplier
          : supplier
      )
    );
  };

  const removeSupplier = (
    supplierId
  ) => {
    const updatedSuppliers =
      deleteSupplier(supplierId);

    setSuppliers(updatedSuppliers);
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        loading,
        addSupplier,
        editSupplier,
        removeSupplier,
      }}
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
      "useSupplierContext must be used inside SupplierProvider"
    );
  }

  return context;
};