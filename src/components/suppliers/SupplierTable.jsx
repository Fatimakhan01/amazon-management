import {
  FiEdit2,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import Card from "../Card";
import Table from "../Table";

const SupplierTable = ({
  suppliers,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      key: "name",
      label: "Supplier",
      render: (supplier) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <FiUser size={17} />
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {supplier.name}
            </p>

            <p className="text-xs text-gray-400">
              {supplier.contactPerson}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "phone",
      label: "Phone",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "address",
      label: "Address",
      render: (supplier) => (
        <span
          className="block max-w-55 truncate"
          title={supplier.address}
        >
          {supplier.address}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (supplier) => {
        const statusStyles = {
          Active:
            "bg-green-50 text-green-700",
          Inactive:
            "bg-gray-100 text-gray-600",
        };

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              statusStyles[
                supplier.status
              ]
            }`}
          >
            {supplier.status}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Actions",
      render: (supplier) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onEdit(supplier)
            }
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(supplier)
            }
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
        columns={columns}
        data={suppliers}
        rowKey="id"
        emptyMessage="No suppliers found."
      />
    </Card>
  );
};

export default SupplierTable;