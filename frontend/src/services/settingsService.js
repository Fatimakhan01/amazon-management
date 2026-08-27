const API_URL = "http://localhost:5000/api/settings";

export const getSettings = async () => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch settings.");
  }

  return data.settings;
};

export const saveSettings = async (settings) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      warehouseName: settings.warehouseName,
      lowStockThreshold: Number(settings.lowStockThreshold),
      currency: settings.currency,
      emailNotifications: settings.emailNotifications,
      lowStockNotifications: settings.lowStockNotifications,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save settings.");
  }

  return data.settings;
};

export const resetSettings = async () => {
  const response = await fetch(`${API_URL}/reset`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset settings.");
  }

  return data.settings;
};