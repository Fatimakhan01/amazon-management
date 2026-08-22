import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../Card";

const orderStatusData = [
  {
    name: "Completed",
    value: 180,
  },
  {
    name: "Pending",
    value: 42,
  },
  {
    name: "Processing",
    value: 64,
  },
  {
    name: "Cancelled",
    value: 40,
  },
];

const STATUS_COLORS = [
  "#131921",
  "#FF9900",
  "#3B82F6",
  "#EF4444",
];

const OrderStatusChart = () => {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Order Status
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of current order statuses.
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
            >
              {orderStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={STATUS_COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                value,
                name,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OrderStatusChart;