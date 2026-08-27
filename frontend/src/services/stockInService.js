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

export const getStockIns = async () => {
  const response = await fetch(
    `${API_URL}/stock-ins`,
  );

  const data = await handleResponse(response);

  return data.stockIns;
};

export const createStockIn = async (
  stockInData,
) => {
  const response = await fetch(
    `${API_URL}/stock-ins`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockInData),
    },
  );

  const data = await handleResponse(response);

  return data.stockIn;
};