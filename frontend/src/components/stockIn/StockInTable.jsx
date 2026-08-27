import Card from "../Card";
import Table from "../Table";

import { useStockInContext } from "../../context/StockInContext";

const StockInTable = () => {
  const { stockIns } = useStockInContext();

  const columns = [
    {
      key: "product",
      label: "Product",
      render: (stockIn) =>
        stockIn.product_name || "Unknown",
    },
    {
      key: "supplier",
      label: "Supplier",
      render: (stockIn) =>
        stockIn.supplier_name || "—",
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (stockIn) => (
        <span className="font-semibold text-green-600">
          +{Number(
            stockIn.quantity,
          ).toLocaleString()}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "note",
      label: "Note",
      render: (stockIn) =>
        stockIn.note || "—",
    },
  ];

  return (
    <Card padding={false}>
      <Table
        columns={columns}
        data={stockIns}
        rowKey="id"
        emptyMessage="No stock in records found."
      />
    </Card>
  );
};

export default StockInTable;