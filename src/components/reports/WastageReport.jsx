import Card from "../Card";

const WastageReport = ({ wastageStats }) => {
  return (
    <Card padding={false}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Wastage Report</h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of inventory wastage and losses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Wasted Quantity</p>

          <p className="mt-1 text-xl font-semibold text-orange-600">
            {wastageStats.totalWastageQuantity.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Wastage Loss</p>

          <p className="mt-1 text-xl font-semibold text-red-600">
            Rs. {wastageStats.totalWastageLoss.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WastageReport;
