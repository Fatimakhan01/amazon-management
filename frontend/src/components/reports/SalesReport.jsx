import Card from "../Card";

const SalesReport = ({ salesStats }) => {
  return (
    <Card padding={false}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Sales Report</h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of order and revenue performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Total Orders</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {salesStats.totalOrders.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Revenue</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            Rs. {salesStats.revenue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Completed Orders</p>

          <p className="mt-1 text-xl font-semibold text-green-600">
            {salesStats.completedOrders.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Pending Orders</p>

          <p className="mt-1 text-xl font-semibold text-orange-600">
            {salesStats.pendingOrders.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Cancelled Orders</p>

          <p className="mt-1 text-xl font-semibold text-red-600">
            {salesStats.cancelledOrders.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SalesReport;
