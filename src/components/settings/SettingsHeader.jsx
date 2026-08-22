import { FiSettings } from "react-icons/fi";

const SettingsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your warehouse application preferences.
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <FiSettings size={20} />
      </div>
    </div>
  );
};

export default SettingsHeader;
