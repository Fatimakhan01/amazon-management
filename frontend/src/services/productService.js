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

export const getProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`,
  );

  const data = await handleResponse(response);

  return data.products;
};

export const createProduct = async (
  productData,
) => {
  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    },
  );

  const data = await handleResponse(response);

  return data.product;
};

export const updateProduct = async (
  productId,
  productData,
) => {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    },
  );

  const data = await handleResponse(response);

  return data.product;
};

export const deleteProduct = async (
  productId,
) => {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "DELETE",
    },
  );

  return handleResponse(response);
};