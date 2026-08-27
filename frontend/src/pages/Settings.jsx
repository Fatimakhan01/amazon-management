import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsForm from "../components/settings/SettingsForm";

import { useSettingsContext } from "../context/SettingsContext";

const Settings = () => {
  const {
    settings,
    loading,
    error,
    updateSettings,
    resetAllSettings,
  } = useSettingsContext();

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading settings...
        </p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || "Failed to load settings."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SettingsHeader />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <SettingsForm
        settings={settings}
        onSave={updateSettings}
        onReset={resetAllSettings}
      />
    </div>
  );
};

export default Settings;