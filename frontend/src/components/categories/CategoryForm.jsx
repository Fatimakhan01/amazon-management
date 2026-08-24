import {
  useEffect,
  useState,
} from "react";

import Button from "../Button";
import Input from "../Input";

const defaultValues = {
  name: "",
  description: "",
  status: "Active",
  date: "",
};

const CategoryForm = ({
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

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description:
        formData.description.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-5">
        <Input
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
          required
        />

        <div>
          <label
            htmlFor="category-description"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="category-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          />
        </div>

        <div>
          <label
            htmlFor="category-form-status"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="category-form-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
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
            ? "Update Category"
            : "Add Category"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;