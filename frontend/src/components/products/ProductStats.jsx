import {
  FiPackage,
  FiLayers,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

import Card from "../Card";
import { useProductContext } from "../../context/ProductContext";

const ProductStats = () => {
  const { products } = useProductContext();

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) => {
      const quantity = Number(
        product.quantity || 0
      );

      return (
        quantity > 0 &&
        quantity < 10
      );
    }
  ).length;

  const outOfStockProducts =
    products.filter(
      (product) =>
        Number(product.quantity || 0) === 0
    ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: FiPackage,
      description: "Products in inventory",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: FiLayers,
      description: "Units available",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      icon: FiAlertTriangle,
      description: "Products below threshold",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts,
      icon: FiXCircle,
      description: "Products unavailable",
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

export default ProductStats;