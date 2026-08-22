import { useEffect, useState } from "react";

import Button from "../Button";
import Input from "../Input";
import { useCategoryContext } from "../../context/CategoryContext";
import { useSupplierContext } from "../../context/SupplierContext";

const defaultValues = {
  name: "",
  sku: "",
  barcode: "",
  category: "",
  supplierId: "",
  costPrice: "",
  sellingPrice: "",
  quantity: "",
  status: "In Stock",
  date: "",
};

const ProductForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const { categories } = useCategoryContext();
  const { suppliers } = useSupplierContext();

  const [formData, setFormData] = useState(defaultValues);

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
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const quantity = Number(formData.quantity || 0);

    let status = "In Stock";

    if (quantity === 0) {
      status = "Out of Stock";
    } else if (quantity < 10) {
      status = "Low Stock";
    }

    onSubmit({
      ...formData,
      quantity,
      costPrice: Number(formData.costPrice || 0),
      sellingPrice: Number(formData.sellingPrice || 0),
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <Input
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          placeholder="Enter SKU"
          required
        />

        <Input
          label="Barcode"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          placeholder="Enter barcode"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="supplierId"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Supplier
          </label>

          <select
            id="supplierId"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Cost Price"
          name="costPrice"
          type="number"
          value={formData.costPrice}
          onChange={handleChange}
          placeholder="Enter cost price"
          required
        />

        <Input
          label="Selling Price"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={handleChange}
          placeholder="Enter selling price"
          required
        />

        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          min="0"
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
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;