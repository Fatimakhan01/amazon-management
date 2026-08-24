import Card from "../Card";

const StockMovementReport = ({ stockMovementStats }) => {
  return (
    <Card padding={false}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Stock Movement</h2>

        <p className="mt-1 text-sm text-gray-500">
          Track incoming and outgoing inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">Stock In</p>

          <p className="mt-1 text-xl font-semibold text-green-600">
            + {stockMovementStats.totalStockIn.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Stock Out</p>

          <p className="mt-1 text-xl font-semibold text-red-600">
            - {stockMovementStats.totalStockOut.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Net Movement</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {stockMovementStats.netMovement.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StockMovementReport;
