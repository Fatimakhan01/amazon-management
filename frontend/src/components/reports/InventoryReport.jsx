import Card from "../Card";

const InventoryReport = ({ inventoryStats }) => {
  return (
    <Card padding={false}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Inventory Report
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current warehouse inventory overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Total Products</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {inventoryStats.totalProducts.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Stock</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {inventoryStats.totalStock.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Inventory Cost</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            Rs. {inventoryStats.inventoryCost.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Inventory Selling Value</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            Rs. {inventoryStats.inventoryValue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Low Stock Products</p>

          <p className="mt-1 text-xl font-semibold text-orange-600">
            {inventoryStats.lowStockProducts.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Out of Stock</p>

          <p className="mt-1 text-xl font-semibold text-red-600">
            {inventoryStats.outOfStockProducts.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InventoryReport;
