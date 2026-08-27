import { FiShoppingCart } from "react-icons/fi";

import Card from "../Card";
import Table from "../Table";

const OrderTable = ({ orders }) => {
  const columns = [
    {
      key: "product",
      label: "Product",
      render: (order) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <FiShoppingCart size={17} />
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {order.product_name ||
                "Unknown Product"}
            </p>

            <p className="text-xs text-gray-400">
              {order.customer_name}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "quantity",
      label: "Quantity",
      render: (order) =>
        Number(
          order.quantity || 0,
        ).toLocaleString(),
    },

    {
      key: "revenue",
      label: "Revenue",
      render: (order) =>
        `Rs. ${Number(
          order.revenue || 0,
        ).toLocaleString()}`,
    },

    {
      key: "profit",
      label: "Profit",
      render: (order) => (
        <span className="font-medium text-green-600">
          Rs.{" "}
          {Number(
            order.profit || 0,
          ).toLocaleString()}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (order) => {
        const styles = {
          Pending:
            "bg-yellow-50 text-yellow-700",
          Processing:
            "bg-blue-50 text-blue-700",
          Completed:
            "bg-green-50 text-green-700",
          Cancelled:
            "bg-red-50 text-red-700",
        };

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              styles[order.status] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status}
          </span>
        );
      },
    },

    {
      key: "date",
      label: "Date",
    },
  ];

  return (
    <Card padding={false}>
      <Table
        columns={columns}
        data={orders}
        rowKey="id"
        emptyMessage="No orders found."
      />
    </Card>
  );
};

export default OrderTable;