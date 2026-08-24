import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const currentUser =
      getCurrentUser();

    setUser(currentUser);
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    const newUser =
      signupUser(userData);

    return newUser;
  };

  const login = async (credentials) => {
    const loggedInUser =
      loginUser(credentials);

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const isAuthenticated =
    Boolean(user);

  const value = {
    user,
    loading,
    isAuthenticated,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};