import Card from "../Card";

const RecentOrders = ({ orders = [] }) => {
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.created_at || b.date) -
        new Date(a.created_at || a.date)
    )
    .slice(0, 5);

  return (
    <Card padding={false}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Orders
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest orders in your warehouse.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {recentOrders.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No orders found.
          </div>
        ) : (
          recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                  {order.productName ||
                    order.product_name ||
                    "Unknown Product"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {order.customerName ||
                    order.customer_name ||
                    "Customer"}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-medium text-gray-900">
                  Rs.{" "}
                  {Number(
                    order.revenue || 0
                  ).toLocaleString()}
                </p>

                <span className="text-xs text-gray-500">
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentOrders;