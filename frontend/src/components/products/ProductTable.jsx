import {
  FiEdit2,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";

import Card from "../Card";
import Table from "../Table";
import { useSupplierContext } from "../../context/SupplierContext";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}) => {
  const { suppliers } = useSupplierContext();

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(
      (item) => item.id === supplierId
    );

    return supplier?.name || "Unknown Supplier";
  };

  const productColumns = [
    {
      key: "name",
      label: "Product",
      render: (product) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <FiPackage size={17} />
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {product.name}
            </p>

            <p className="text-xs text-gray-400">
              {product.sku}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
    },

    {
      key: "supplierId",
      label: "Supplier",
      render: (product) => (
        <span className="text-gray-700">
          {getSupplierName(product.supplierId)}
        </span>
      ),
    },

    {
      key: "quantity",
      label: "Stock",
      render: (product) => {
        const quantity = Number(product.quantity || 0);

        const className =
          quantity === 0
            ? "font-semibold text-red-600"
            : quantity < 10
            ? "font-semibold text-orange-600"
            : "font-medium text-gray-700";

        return (
          <span className={className}>
            {quantity}
          </span>
        );
      },
    },

    {
      key: "sellingPrice",
      label: "Selling Price",
      render: (product) =>
        `Rs. ${Number(
          product.sellingPrice || 0
        ).toLocaleString()}`,
    },

    {
      key: "status",
      label: "Status",
      render: (product) => {
        const statusStyles = {
          "In Stock": "bg-green-50 text-green-700",
          "Low Stock": "bg-orange-50 text-orange-700",
          "Out of Stock": "bg-red-50 text-red-700",
        };

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              statusStyles[product.status] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {product.status}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Actions",
      render: (product) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Card padding={false}>
      <Table
        columns={productColumns}
        data={products}
        rowKey="id"
        emptyMessage="No products found."
      />
    </Card>
  );
};

export default ProductTable;