const USERS_KEY = "warehouse_users";
const CURRENT_USER_KEY = "warehouse_current_user";

const getStoredUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    return JSON.parse(storedUsers);
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
};

export const getCurrentUser = () => {
  const storedUser =
    localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const signupUser = ({
  name,
  email,
  password,
}) => {
  const users = getStoredUsers();

  const normalizedEmail =
    email.trim().toLowerCase();

  const existingUser = users.find(
    (user) =>
      user.email === normalizedEmail
  );

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);

  return newUser;
};

export const loginUser = ({
  email,
  password,
}) => {
  const users = getStoredUsers();

  const normalizedEmail =
    email.trim().toLowerCase();

  const user = users.find(
    (item) =>
      item.email === normalizedEmail &&
      item.password === password
  );

  if (!user) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );

  return currentUser;
};

export const logoutUser = () => {
  localStorage.removeItem(
    CURRENT_USER_KEY
  );
};

export const isEmailRegistered = (
  email
) => {
  const users = getStoredUsers();

  const normalizedEmail =
    email.trim().toLowerCase();

  return users.some(
    (user) =>
      user.email === normalizedEmail
  );
};