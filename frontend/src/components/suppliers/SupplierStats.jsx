import {
  FiUsers,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import Card from "../Card";

import {
  useSupplierContext,
} from "../../context/SupplierContext";

const SupplierStats = () => {
  const { suppliers } =
    useSupplierContext();

  const totalSuppliers =
    suppliers.length;

  const activeSuppliers =
    suppliers.filter(
      (supplier) =>
        supplier.status === "Active"
    ).length;

  const inactiveSuppliers =
    suppliers.filter(
      (supplier) =>
        supplier.status === "Inactive"
    ).length;

  const stats = [
    {
      title: "Total Suppliers",
      value: totalSuppliers,
      icon: FiUsers,
      description:
        "Suppliers in system",
    },
    {
      title: "Active Suppliers",
      value: activeSuppliers,
      icon: FiCheckCircle,
      description:
        "Currently active",
    },
    {
      title: "Inactive Suppliers",
      value: inactiveSuppliers,
      icon: FiXCircle,
      description:
        "Currently inactive",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

                <p className="mt-1 text-xs text-gray-400">
                  {stat.description}
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

export default SupplierStats;