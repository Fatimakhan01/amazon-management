import { API_BASE_URL } from "../config/api";

const TOKEN_KEY = "warehouse_auth_token";
const USER_KEY = "warehouse_current_user";

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();

    return data.message || "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
};

export const signupUser = async (userData) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response),
    );
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response),
    );
  }

  const data = await response.json();

  localStorage.setItem(
    TOKEN_KEY,
    data.token,
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(data.user),
  );

  return data.user;
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(
    USER_KEY,
  );

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};