import {
  FiEdit2,
  FiTrash2,
  FiFolder,
} from "react-icons/fi";

import Card from "../Card";
import Table from "../Table";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      key: "name",
      label: "Category",
      render: (category) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <FiFolder size={17} />
          </div>

          <p className="font-medium text-gray-900">
            {category.name}
          </p>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (category) => (
        <span className="text-gray-600">
          {category.description ||
            "No description"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (category) => {
        const normalizedStatus =
          category.status
            ?.trim()
            ?.toLowerCase();

        const isActive =
          normalizedStatus === "active";

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              isActive
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {category.status || "Inactive"}
          </span>
        );
      },
    },
    {
      key: "date",
      label: "Date",
      render: (category) => (
        <span className="text-gray-600">
          {category.date || "-"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (category) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(category)}
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
        data={categories}
        rowKey="id"
        emptyMessage="No categories found."
      />
    </Card>
  );
};

export default CategoryTable;