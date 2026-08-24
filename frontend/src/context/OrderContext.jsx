import { createContext, useContext, useEffect, useState } from "react";

import {getOrders,createOrder,updateOrder,deleteOrder,} from "../services/orderService";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedOrders = getOrders();

    setOrders(storedOrders);
    setLoading(false);
  }, []);

  const addOrder = (orderData) => {
    const newOrder = createOrder(orderData);

    setOrders((previousOrders) => [...previousOrders, newOrder]);

    return newOrder;
  };

  const editOrder = (orderId, orderData) => {
    const updatedOrder = updateOrder(orderId, orderData);

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId ? updatedOrder : order,
      ),
    );

    return updatedOrder;
  };

  const removeOrder = (orderId) => {
    const updatedOrders = deleteOrder(orderId);

    setOrders(updatedOrders);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        addOrder,
        editOrder,
        removeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrderContext must be used inside OrderProvider.");
  }

  return context;
};
