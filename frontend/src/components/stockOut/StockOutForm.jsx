import { useState } from "react";

import Button from "../Button";
import Input from "../Input";

import { useProductContext } from "../../context/ProductContext";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const initialForm = {
  productId: "",
  quantity: "",
  reason: "Customer Order",
  date: getToday(),
  note: "",
};

const StockOutForm = ({ onSubmit, onCancel }) => {
  const { products } = useProductContext();

  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState("");

  const selectedProduct = products.find(
    (product) => product.id === formData.productId,
  );

  const handleProductChange = (event) => {
    setError("");

    setFormData((previous) => ({
      ...previous,
      productId: event.target.value,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError("");

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.productId) {
      setError("Please select a product.");
      return;
    }

    const quantity = Number(formData.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }

    const availableQuantity = Number(selectedProduct?.quantity || 0);

    if (quantity > availableQuantity) {
      setError(`Only ${availableQuantity} units are available.`);
      return;
    }

    if (!formData.date) {
      setError("Please select a date.");
      return;
    }

    onSubmit({
      productId: formData.productId,
      quantity,
      reason: formData.reason,
      date: formData.date,
      note: formData.note.trim(),
    });

    setFormData(initialForm);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            onChange={handleProductChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — {product.sku}
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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Reason
          </label>

          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="Customer Order">Customer Order</option>

            <option value="Damaged">Damaged</option>

            <option value="Internal Use">Internal Use</option>

            <option value="Transfer">Transfer</option>

            <option value="Other">Other</option>
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

        <div className="md:col-span-2">
          <label
            htmlFor="stock-out-note"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Note
          </label>

          <textarea
            id="stock-out-note"
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
          <p className="text-sm text-gray-500">Available Stock</p>

          <p className="mt-1 text-lg font-semibold text-gray-900">
            {Number(selectedProduct.quantity || 0).toLocaleString()} units
          </p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Remove Stock</Button>
      </div>
    </form>
  );
};

export default StockOutForm;
