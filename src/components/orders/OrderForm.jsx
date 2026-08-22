import { useEffect, useState } from "react";

import Input from "../Input";
import Button from "../Button";

import { useProductContext } from "../../context/ProductContext";

const defaultValues = {
  productId: "",
  customerName: "",
  quantity: "",
  sellingPrice: "",
  costPrice: "",
  status: "Pending",
  date: "",
};

const OrderForm = ({ onSubmit, onCancel }) => {
  const { products } = useProductContext();

  const [formData, setFormData] = useState(defaultValues);

  const [error, setError] = useState("");

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id === formData.productId,
    );

    if (!selectedProduct) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      sellingPrice: selectedProduct.sellingPrice,
      costPrice: selectedProduct.costPrice,
    }));
  }, [formData.productId, products]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const product = products.find((item) => item.id === formData.productId);

    if (!product) {
      setError("Please select a product.");
      return;
    }

    const quantity = Number(formData.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }

    const availableStock = Number(product.quantity || 0);

    if (quantity > availableStock) {
      setError(`Insufficient stock. Available quantity is ${availableStock}.`);
      return;
    }

    onSubmit({
      productId: product.id,
      productName: product.name,
      customerName: formData.customerName,
      quantity,
      sellingPrice: Number(formData.sellingPrice),
      costPrice: Number(formData.costPrice),
      status: formData.status,
      date: formData.date || new Date().toISOString().split("T")[0],
    });
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
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="">Select Product</option>

            {products
              .filter((product) => Number(product.quantity || 0) > 0)
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — Stock: {product.quantity}
                </option>
              ))}
          </select>
        </div>

        <Input
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          required
        />

        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          min="1"
          required
        />

        <Input
          label="Selling Price"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={handleChange}
          disabled
        />

        <Input
          label="Cost Price"
          name="costPrice"
          type="number"
          value={formData.costPrice}
          onChange={handleChange}
          disabled
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20"
          >
            <option value="Pending">Pending</option>

            <option value="Processing">Processing</option>

            <option value="Completed">Completed</option>

            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <Input
          label="Order Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Create Order</Button>
      </div>
    </form>
  );
};

export default OrderForm;
