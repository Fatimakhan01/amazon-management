import {
  FiPackage,
  FiLayers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
  FiTrash2,
  FiClock,
} from "react-icons/fi";

import StatCard from "../components/dashboard/StatCard";
import LowStockList from "../components/dashboard/LowStockList";
import OrderStatusChart from "../components/dashboard/OrderStatusChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import RevenueChart from "../components/dashboard/RevenueChart";

import {
  useProductContext,
} from "../context/ProductContext";

const Dashboard = () => {
  const { products } =
    useProductContext();

  const totalProducts =
    products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total +
      Number(product.quantity || 0),
    0
  );

  const lowStock = products.filter(
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

  const outOfStock =
    products.filter(
      (product) =>
        Number(product.quantity || 0) ===
        0
    ).length;

  const stats = [
    {
      title: "Total Products",
      value:
        totalProducts.toLocaleString(),
      icon: FiPackage,
      description:
        "Products in inventory",
    },
    {
      title: "Total Stock",
      value:
        totalStock.toLocaleString(),
      icon: FiLayers,
      description: "Units available",
    },
    {
      title: "Orders",
      value: "0",
      icon: FiShoppingCart,
      description: "Orders placed",
    },
    {
      title: "Revenue",
      value: "Rs. 0",
      icon: FiDollarSign,
      description: "Total revenue",
    },
    {
      title: "Profit",
      value: "Rs. 0",
      icon: FiTrendingUp,
      description: "Total profit",
    },
    {
      title: "Low Stock",
      value: lowStock.toLocaleString(),
      icon: FiAlertTriangle,
      description:
        "Below stock threshold",
    },
    {
      title: "Out of Stock",
      value:
        outOfStock.toLocaleString(),
      icon: FiTrash2,
      description:
        "Products unavailable",
    },
    {
      title: "Pending Orders",
      value: "0",
      icon: FiClock,
      description:
        "Orders awaiting action",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your warehouse
          operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueChart />
        <OrderStatusChart />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LowStockList />
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;