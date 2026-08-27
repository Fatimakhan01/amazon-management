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

export const getOrders = async () => {
  const response = await fetch(
    `${API_URL}/orders`,
  );

  const data = await handleResponse(response);

  return data.orders;
};

export const createOrder = async (
  orderData,
) => {
  const response = await fetch(
    `${API_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    },
  );

  const data = await handleResponse(response);

  return data.order;
};