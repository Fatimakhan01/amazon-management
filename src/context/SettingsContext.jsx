import { createContext, useContext, useEffect, useState } from "react";

import {getSettings,saveSettings,resetSettings,} from "../services/settingsService";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSettings = getSettings();

    setSettings(storedSettings);
    setLoading(false);
  }, []);

  const updateSettings = (updatedSettings) => {
    const newSettings = {
      ...settings,
      ...updatedSettings,
    };

    saveSettings(newSettings);

    setSettings(newSettings);

    return newSettings;
  };

  const resetAllSettings = () => {
    const defaultSettings = resetSettings();

    setSettings(defaultSettings);

    return defaultSettings;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
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
    throw new Error("useSettingsContext must be used inside SettingsProvider.");
  }

  return context;
};
