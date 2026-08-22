import { useEffect, useState } from "react";

import Button from "../Button";
import Input from "../Input";

const defaultValues = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  status: "Active",
  date: "",
};

const SupplierForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] =
    useState(defaultValues);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...defaultValues,
        ...initialValues,
      });
    } else {
      setFormData(defaultValues);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          label="Supplier Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter supplier name"
          required
        />

        <Input
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Enter contact person"
          required
        />

        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div>
          <label
            htmlFor="supplier-status-input"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="supplier-status-input"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="supplier-address"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Address
          </label>

          <textarea
            id="supplier-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter supplier address"
            rows={3}
            required
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {isEditing
            ? "Update Supplier"
            : "Add Supplier"}
        </Button>
      </div>
    </form>
  );
};

export default SupplierForm;