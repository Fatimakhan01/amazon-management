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

import { useProductContext } from "../context/ProductContext";
import { useOrderContext } from "../context/OrderContext";
import { useSettingsContext } from "../context/SettingsContext";

const Dashboard = () => {
  const { products } = useProductContext();
  const { orders } = useOrderContext();
  const { settings } = useSettingsContext();

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  const lowStockThreshold = Number(
    settings?.lowStockThreshold || 10
  );

  const lowStock = products.filter((product) => {
    const quantity = Number(product.quantity || 0);

    return (
      quantity > 0 &&
      quantity < lowStockThreshold
    );
  }).length;

  const outOfStock = products.filter(
    (product) =>
      Number(product.quantity || 0) === 0
  ).length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.revenue || 0),
    0
  );

  const totalProfit = orders.reduce(
    (total, order) =>
      total + Number(order.profit || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) =>
      String(order.status || "").toLowerCase() ===
      "pending"
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: FiPackage,
      description: "Products in inventory",
    },
    {
      title: "Total Stock",
      value: totalStock.toLocaleString(),
      icon: FiLayers,
      description: "Units available",
    },
    {
      title: "Orders",
      value: totalOrders.toLocaleString(),
      icon: FiShoppingCart,
      description: "Orders placed",
    },
    {
      title: "Revenue",
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      description: "Total revenue",
    },
    {
      title: "Profit",
      value: `Rs. ${totalProfit.toLocaleString()}`,
      icon: FiTrendingUp,
      description: "Total profit",
    },
    {
      title: "Low Stock",
      value: lowStock.toLocaleString(),
      icon: FiAlertTriangle,
      description: "Below stock threshold",
    },
    {
      title: "Out of Stock",
      value: outOfStock.toLocaleString(),
      icon: FiTrash2,
      description: "Products unavailable",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toLocaleString(),
      icon: FiClock,
      description: "Orders awaiting action",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your warehouse operations.
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
        <RevenueChart orders={orders} />

        <OrderStatusChart
          orders={orders}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LowStockList />

        <RecentOrders
          orders={orders}
        />
      </div>
    </div>
  );
};

export default Dashboard;