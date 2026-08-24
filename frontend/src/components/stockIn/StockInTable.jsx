import Card from "../Card";
import Table from "../Table";

import { useProductContext } from "../../context/ProductContext";
import { useSupplierContext } from "../../context/SupplierContext";
import { useStockInContext } from "../../context/StockInContext";

const StockInTable = () => {
  const { stockIns } = useStockInContext();

  const { products } = useProductContext();

  const { suppliers } = useSupplierContext();

  const getProductName = (productId) => {
    const product = products.find((item) => item.id === productId);

    return product?.name || "Unknown";
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((item) => item.id === supplierId);

    return supplier?.name || "—";
  };

  const columns = [
    {
      key: "product",
      label: "Product",
      render: (stockIn) => getProductName(stockIn.productId),
    },
    {
      key: "supplier",
      label: "Supplier",
      render: (stockIn) => getSupplierName(stockIn.supplierId),
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (stockIn) => (
        <span className="font-semibold text-green-600">
          +{Number(stockIn.quantity).toLocaleString()}
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
      render: (stockIn) => stockIn.note || "—",
    },
  ];

  const sortedStockIns = [...stockIns].reverse();

  return (
    <Card padding={false}>
      <Table
        columns={columns}
        data={sortedStockIns}
        rowKey="id"
        emptyMessage="No stock in records found."
      />
    </Card>
  );
};

export default StockInTable;
