import {FiShoppingCart,FiDollarSign,FiTrendingUp,FiClock,} from "react-icons/fi";

import Card from "../Card";

import { useOrderContext } from "../../context/OrderContext";

const OrderStats = () => {
  const { orders } = useOrderContext();

  const revenue = orders.reduce(
    (total, order) => total + Number(order.revenue || 0),
    0,
  );

  const profit = orders.reduce(
    (total, order) => total + Number(order.profit || 0),
    0,
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: FiShoppingCart,
    },
    {
      title: "Revenue",
      value: `Rs. ${revenue.toLocaleString()}`,
      icon: FiDollarSign,
    },
    {
      title: "Profit",
      value: `Rs. ${profit.toLocaleString()}`,
      icon: FiTrendingUp,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: FiClock,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <Icon size={20} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderStats;
