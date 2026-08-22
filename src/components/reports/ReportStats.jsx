import {FiPackage,FiShoppingCart,FiDollarSign,FiAlertTriangle,} from "react-icons/fi";

import Card from "../Card";

const ReportStats = ({ inventoryStats, salesStats }) => {
  const stats = [
    {
      title: "Inventory Value",
      value: `Rs. ${inventoryStats.inventoryValue.toLocaleString()}`,
      icon: FiPackage,
    },
    {
      title: "Total Revenue",
      value: `Rs. ${salesStats.revenue.toLocaleString()}`,
      icon: FiDollarSign,
    },
    {
      title: "Total Orders",
      value: salesStats.totalOrders.toLocaleString(),
      icon: FiShoppingCart,
    },
    {
      title: "Low Stock",
      value: inventoryStats.lowStockProducts.toLocaleString(),
      icon: FiAlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

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

export default ReportStats;
