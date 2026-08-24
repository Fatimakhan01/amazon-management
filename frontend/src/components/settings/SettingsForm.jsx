import { useEffect, useState } from "react";

import Button from "../Button";
import Card from "../Card";

const SettingsForm = ({ settings, onSave, onReset }) => {
  const [formData, setFormData] = useState(settings);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...formData,
      lowStockThreshold: Number(formData.lowStockThreshold),
    });

    setSaved(true);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            General Settings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure your warehouse preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="warehouseName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Warehouse Name
            </label>

            <input
              id="warehouseName"
              name="warehouseName"
              value={formData.warehouseName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
            />
          </div>

          <div>
            <label
              htmlFor="lowStockThreshold"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Low Stock Threshold
            </label>

            <input
              id="lowStockThreshold"
              name="lowStockThreshold"
              type="number"
              min="0"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
            />
          </div>

          <div>
            <label
              htmlFor="currency"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Currency
            </label>

            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
            >
              <option value="PKR">PKR</option>

              <option value="USD">USD</option>

              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-5">
          <h3 className="font-medium text-gray-900">Notifications</h3>

          <label className="flex cursor-pointer items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Email Notifications
              </p>

              <p className="text-xs text-gray-400">
                Receive important warehouse notifications.
              </p>
            </div>

            <input
              type="checkbox"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleChange}
              className="h-4 w-4 accent-[#FF9900]"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Low Stock Notifications
              </p>

              <p className="text-xs text-gray-400">
                Get notified when products reach the stock threshold.
              </p>
            </div>

            <input
              type="checkbox"
              name="lowStockNotifications"
              checked={formData.lowStockNotifications}
              onChange={handleChange}
              className="h-4 w-4 accent-[#FF9900]"
            />
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onReset}>
            Reset
          </Button>

          <Button type="submit">Save Settings</Button>
        </div>

        {saved && (
          <p className="text-right text-sm font-medium text-green-600">
            Settings saved successfully.
          </p>
        )}
      </form>
    </Card>
  );
};

export default SettingsForm;
