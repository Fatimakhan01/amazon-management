import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsForm from "../components/settings/SettingsForm";

import { useSettingsContext } from "../context/SettingsContext";

const Settings = () => {
  const { settings, loading, updateSettings, resetAllSettings } =
    useSettingsContext();

  if (loading || !settings) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SettingsHeader />

      <SettingsForm
        settings={settings}
        onSave={updateSettings}
        onReset={resetAllSettings}
      />
    </div>
  );
};

export default Settings;
