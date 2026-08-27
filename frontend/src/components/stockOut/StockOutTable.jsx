import Card from "../Card";
import Table from "../Table";

import { useStockOutContext } from "../../context/StockOutContext";

const StockOutTable = () => {
  const { stockOuts } = useStockOutContext();

  const columns = [
    {
      key: "product",
      label: "Product",
      render: (stockOut) =>
        stockOut.product_name || "Unknown",
    },

    {
      key: "quantity",
      label: "Quantity",
      render: (stockOut) => (
        <span className="font-semibold text-red-600">
          -{Number(stockOut.quantity).toLocaleString()}
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

    {
      key: "note",
      label: "Note",
      render: (stockOut) =>
        stockOut.note || "—",
    },
  ];

  return (
    <Card padding={false}>
      <Table
        columns={columns}
        data={stockOuts}
        rowKey="id"
        emptyMessage="No stock out records found."
      />
    </Card>
  );
};

export default StockOutTable;