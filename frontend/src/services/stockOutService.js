const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const getStockOuts = async () => {
  const response = await fetch(`${API_URL}/stock-outs`);

  const data = await handleResponse(response);

  return data.stockOuts;
};

export const createStockOut = async (stockOutData) => {
  const response = await fetch(`${API_URL}/stock-outs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stockOutData),
  });

  const data = await handleResponse(response);

  return data.stockOut;
};