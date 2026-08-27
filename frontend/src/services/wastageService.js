const API_URL = "http://localhost:5000/api/wastages";

export const getWastages = async () => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch wastage records.",
    );
  }

  return data.wastages;
};

export const createWastage = async (wastageData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wastageData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create wastage record.",
    );
  }

  return data.wastage;
};

export const deleteWastage = async (wastageId) => {
  const response = await fetch(
    `${API_URL}/${wastageId}`,
    {
      method: "DELETE",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete wastage record.",
    );
  }

  return data;
};