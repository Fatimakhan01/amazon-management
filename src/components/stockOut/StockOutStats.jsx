import { FiPackage, FiTrendingDown } from "react-icons/fi";

import Card from "../Card";

import { useStockOutContext } from "../../context/StockOutContext";

const StockOutStats = () => {
  const { stockOuts } = useStockOutContext();

  const totalTransactions = stockOuts.length;

  const totalUnits = stockOuts.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const stats = [
    {
      title: "Stock Out Transactions",
      value: totalTransactions,
      description: "Total outgoing transactions",
      icon: FiPackage,
    },
    {
      title: "Total Units Removed",
      value: totalUnits,
      description: "Units removed from inventory",
      icon: FiTrendingDown,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  {stat.value.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
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

export default StockOutStats;
