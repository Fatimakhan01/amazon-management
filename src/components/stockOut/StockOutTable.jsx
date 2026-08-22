import Card from "../Card";
import Table from "../Table";

import { useStockOutContext } from "../../context/StockOutContext";
import { useProductContext } from "../../context/ProductContext";

const StockOutTable = () => {
  const { stockOuts } = useStockOutContext();

  const { products } = useProductContext();

  const getProductName = (productId) => {
    const product = products.find((item) => item.id === productId);

    return product?.name || "Unknown";
  };

  const columns = [
    {
      key: "product",
      label: "Product",
      render: (stockOut) => getProductName(stockOut.productId),
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
      render: (stockOut) => stockOut.note || "—",
    },
  ];

  const sortedStockOuts = [...stockOuts].reverse();

  return (
    <Card padding={false}>
      <Table
        columns={columns}
        data={sortedStockOuts}
        rowKey="id"
        emptyMessage="No stock out records found."
      />
    </Card>
  );
};

export default StockOutTable;
