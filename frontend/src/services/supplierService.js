const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong.",
    );
  }

  return data;
};

export const getSuppliers = async () => {
  const response = await fetch(
    `${API_URL}/suppliers`,
  );

  const data = await handleResponse(response);

  return data.suppliers;
};

export const createSupplier = async (
  supplierData,
) => {
  const response = await fetch(
    `${API_URL}/suppliers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    },
  );

  const data = await handleResponse(response);

  return data.supplier;
};

export const updateSupplier = async (
  supplierId,
  supplierData,
) => {
  const response = await fetch(
    `${API_URL}/suppliers/${supplierId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    },
  );

  const data = await handleResponse(response);

  return data.supplier;
};

export const deleteSupplier = async (
  supplierId,
) => {
  const response = await fetch(
    `${API_URL}/suppliers/${supplierId}`,
    {
      method: "DELETE",
    },
  );

  return handleResponse(response);
};