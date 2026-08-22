import { FiTrash2, FiPackage, FiDollarSign } from "react-icons/fi";

import Card from "../Card";

import { useWastageContext } from "../../context/WastageContext";

const WastageStats = () => {
  const { wastages } = useWastageContext();

  const totalQuantity = wastages.reduce(
    (total, wastage) => total + Number(wastage.quantity || 0),
    0,
  );

  const totalLoss = wastages.reduce(
    (total, wastage) => total + Number(wastage.loss || 0),
    0,
  );

  const stats = [
    {
      title: "Wastage Records",
      value: wastages.length,
      icon: FiTrash2,
    },
    {
      title: "Wasted Units",
      value: totalQuantity,
      icon: FiPackage,
    },
    {
      title: "Total Loss",
      value: `Rs. ${totalLoss.toLocaleString()}`,
      icon: FiDollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

export default WastageStats;
