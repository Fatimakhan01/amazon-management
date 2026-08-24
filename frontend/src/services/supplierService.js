const SUPPLIERS_KEY = "warehouse_suppliers";

export const getSuppliers = () => {
  const storedSuppliers =
    localStorage.getItem(SUPPLIERS_KEY);

  if (!storedSuppliers) {
    return [];
  }

  try {
    return JSON.parse(storedSuppliers);
  } catch (error) {
    console.error(
      "Failed to parse suppliers:",
      error
    );

    return [];
  }
};

const saveSuppliers = (suppliers) => {
  localStorage.setItem(
    SUPPLIERS_KEY,
    JSON.stringify(suppliers)
  );
};

export const createSupplier = (
  supplierData
) => {
  const suppliers = getSuppliers();

  const newSupplier = {
    ...supplierData,
    id: crypto.randomUUID(),
  };

  const updatedSuppliers = [
    ...suppliers,
    newSupplier,
  ];

  saveSuppliers(updatedSuppliers);

  return newSupplier;
};

export const updateSupplier = (
  supplierId,
  supplierData
) => {
  const suppliers = getSuppliers();

  const updatedSupplier = {
    ...supplierData,
    id: supplierId,
  };

  const updatedSuppliers =
    suppliers.map((supplier) =>
      supplier.id === supplierId
        ? updatedSupplier
        : supplier
    );

  saveSuppliers(updatedSuppliers);

  return updatedSupplier;
};

export const deleteSupplier = (
  supplierId
) => {
  const suppliers = getSuppliers();

  const updatedSuppliers =
    suppliers.filter(
      (supplier) =>
        supplier.id !== supplierId
    );

  saveSuppliers(updatedSuppliers);

  return updatedSuppliers;
};