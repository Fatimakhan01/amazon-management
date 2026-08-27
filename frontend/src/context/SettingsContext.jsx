import { createContext, useContext, useEffect, useState } from "react";

import {
  getSettings,
  saveSettings,
  resetSettings,
} from "../services/settingsService";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSettings();

        setSettings(data);
      } catch (error) {
        console.error("Failed to load settings:", error);

        setError(error.message || "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (updatedSettings) => {
    try {
      setError("");

      const newSettings = await saveSettings(updatedSettings);

      setSettings(newSettings);

      return newSettings;
    } catch (error) {
      console.error("Failed to update settings:", error);

      setError(error.message || "Failed to update settings.");

      throw error;
    }
  };

  const resetAllSettings = async () => {
    try {
      setError("");

      const defaultSettings = await resetSettings();

      setSettings(defaultSettings);

      return defaultSettings;
    } catch (error) {
      console.error("Failed to reset settings:", error);

      setError(error.message || "Failed to reset settings.");

      throw error;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        updateSettings,
        resetAllSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used inside SettingsProvider.",
    );
  }

  return context;
};