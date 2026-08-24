import { useEffect, useState } from "react";

import Button from "../Button";
import Input from "../Input";

import {
  useProductContext,
} from "../../context/ProductContext";

import {
  useSupplierContext,
} from "../../context/SupplierContext";

const getToday = () => {
  return new Date()
    .toISOString()
    .split("T")[0];
};

const initialForm = {
  productId: "",
  quantity: "",
  supplierId: "",
  date: getToday(),
  note: "",
};

const StockInForm = ({
  onSubmit,
  onCancel,
}) => {
  const { products } =
    useProductContext();

  const { suppliers } =
    useSupplierContext();

  const [formData, setFormData] =
    useState(initialForm);

  const [error, setError] =
    useState("");

  const selectedProduct =
    products.find(
      (product) =>
        product.id ===
        formData.productId
    );

  useEffect(() => {
    if (selectedProduct?.supplierId) {
      setFormData((previous) => ({
        ...previous,
        supplierId:
          selectedProduct.supplierId,
      }));
    }
  }, [selectedProduct]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setError("");

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProductChange = (
    event
  ) => {
    const productId =
      event.target.value;

    const product = products.find(
      (item) =>
        item.id === productId
    );

    setError("");

    setFormData((previous) => ({
      ...previous,
      productId,
      supplierId:
        product?.supplierId || "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.productId) {
      setError(
        "Please select a product."
      );
      return;
    }

    const quantity = Number(
      formData.quantity
    );

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      setError(
        "Quantity must be greater than zero."
      );
      return;
    }

    if (!formData.date) {
      setError(
        "Please select a date."
      );
      return;
    }

    onSubmit({
      productId:
        formData.productId,
      supplierId:
        formData.supplierId || null,
      quantity,
      date: formData.date,
      note: formData.note.trim(),
    });

    setFormData(initialForm);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Product
          </label>

          <select
            name="productId"
            value={formData.productId}
            onChange={
              handleProductChange
            }
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name} —{" "}
                {product.sku}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Supplier
          </label>

          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">
              Select Supplier
            </option>

            {suppliers.map((supplier) => (
              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Quantity"
          name="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
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

        <div className="md:col-span-2">
          <label
            htmlFor="stock-in-note"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Note
          </label>

          <textarea
            id="stock-in-note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            placeholder="Optional note..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          />
        </div>
      </div>

      {selectedProduct && (
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Current Stock
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900">
            {Number(
              selectedProduct.quantity || 0
            ).toLocaleString()}{" "}
            units
          </p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          Add Stock
        </Button>
      </div>
    </form>
  );
};

export default StockInForm;