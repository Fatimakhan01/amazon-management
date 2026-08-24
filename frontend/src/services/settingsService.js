const SETTINGS_KEY = "warehouse_settings";

const defaultSettings = {
  warehouseName: "Amazon Warehouse",
  lowStockThreshold: 10,
  currency: "PKR",
  emailNotifications: true,
  lowStockNotifications: true,
};

export const getSettings = () => {
  const storedSettings = localStorage.getItem(SETTINGS_KEY);

  if (!storedSettings) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(storedSettings),
    };
  } catch (error) {
    console.error("Failed to load settings:", error);

    return defaultSettings;
  }
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  return settings;
};

export const resetSettings = () => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));

  return defaultSettings;
};
