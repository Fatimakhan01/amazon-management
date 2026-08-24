import {calculateOrderProfit,calculateOrderRevenue,} from "../utils/orderUtils";

const ORDERS_KEY = "warehouse_orders";

export const getOrders = () => {
  const storedOrders = localStorage.getItem(ORDERS_KEY);

  if (!storedOrders) {
    return [];
  }

  try {
    return JSON.parse(storedOrders);
  } catch (error) {
    console.error("Failed to parse orders:", error);

    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const createOrder = (orderData) => {
  const orders = getOrders();

  const quantity = Number(orderData.quantity || 0);

  const sellingPrice = Number(orderData.sellingPrice || 0);

  const costPrice = Number(orderData.costPrice || 0);

  const newOrder = {
    ...orderData,
    id: crypto.randomUUID(),
    quantity,
    sellingPrice,
    costPrice,
    revenue: calculateOrderRevenue(sellingPrice, quantity),
    profit: calculateOrderProfit(sellingPrice, costPrice, quantity),
    status: orderData.status || "Pending",
    date: orderData.date || new Date().toISOString().split("T")[0],
  };

  const updatedOrders = [...orders, newOrder];

  saveOrders(updatedOrders);

  return newOrder;
};

export const updateOrder = (orderId, orderData) => {
  const orders = getOrders();

  const quantity = Number(orderData.quantity || 0);

  const sellingPrice = Number(orderData.sellingPrice || 0);

  const costPrice = Number(orderData.costPrice || 0);

  const updatedOrder = {
    ...orderData,
    id: orderId,
    quantity,
    sellingPrice,
    costPrice,
    revenue: calculateOrderRevenue(sellingPrice, quantity),
    profit: calculateOrderProfit(sellingPrice, costPrice, quantity),
  };

  const updatedOrders = orders.map((order) =>
    order.id === orderId ? updatedOrder : order,
  );

  saveOrders(updatedOrders);

  return updatedOrder;
};

export const deleteOrder = (orderId) => {
  const orders = getOrders();

  const updatedOrders = orders.filter((order) => order.id !== orderId);

  saveOrders(updatedOrders);

  return updatedOrders;
};
