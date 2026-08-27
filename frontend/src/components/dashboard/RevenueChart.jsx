import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Card from "../Card";

const RevenueChart = ({ orders = [] }) => {
  const revenueByDate = {};

  orders.forEach((order) => {
    const date = order.date;

    if (!date) {
      return;
    }

    revenueByDate[date] =
      (revenueByDate[date] || 0) +
      Number(order.revenue || 0);
  });

  const revenueData = Object.entries(
    revenueByDate
  )
    .sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    )
    .slice(-7)
    .map(([date, revenue]) => ({
      date,
      revenue,
    }));

  return (
    <Card className="h-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Revenue generated from recent orders.
        </p>
      </div>

      <div className="h-80 w-full">
        {revenueData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No revenue data available.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `Rs. ${Number(
                    value
                  ).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#FF9900"
                fill="#FF9900"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default RevenueChart;