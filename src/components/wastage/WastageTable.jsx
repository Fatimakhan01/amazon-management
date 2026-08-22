import { FiTrash2 } from "react-icons/fi";

import Card from "../Card";
import Table from "../Table";

const WastageTable = ({ wastages }) => {
  const columns = [
    {
      key: "productName",
      label: "Product",
      render: (wastage) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <FiTrash2 size={17} />
          </div>

          <span className="font-medium text-gray-900">
            {wastage.productName}
          </span>
        </div>
      ),
    },

    {
      key: "quantity",
      label: "Quantity",
    },

    {
      key: "costPrice",
      label: "Cost Price",
      render: (wastage) =>
        `Rs. ${Number(wastage.costPrice || 0).toLocaleString()}`,
    },

    {
      key: "loss",
      label: "Loss",
      render: (wastage) => (
        <span className="font-medium text-red-600">
          Rs. {Number(wastage.loss || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "reason",
      label: "Reason",
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
        data={wastages}
        rowKey="id"
        emptyMessage="No wastage records found."
      />
    </Card>
  );
};

export default WastageTable;
