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

export const getCategories = async () => {
  const response = await fetch(
    `${API_URL}/categories`,
  );

  const data = await handleResponse(response);

  return data.categories;
};

export const createCategory = async (
  categoryData,
) => {
  const response = await fetch(
    `${API_URL}/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    },
  );

  const data = await handleResponse(response);

  return data.category;
};

export const updateCategory = async (
  categoryId,
  categoryData,
) => {
  const response = await fetch(
    `${API_URL}/categories/${categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    },
  );

  const data = await handleResponse(response);

  return data.category;
};

export const deleteCategory = async (
  categoryId,
) => {
  const response = await fetch(
    `${API_URL}/categories/${categoryId}`,
    {
      method: "DELETE",
    },
  );

  return handleResponse(response);
};