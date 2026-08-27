import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getOrders,
  createOrder,
} from "../services/orderService";

const OrderContext = createContext(null);

export const OrderProvider = ({
  children,
}) => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        setOrders(data);
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error,
        );

        setError(
          error.message ||
            "Failed to load orders.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const addOrder = async (orderData) => {
    try {
      setError("");

      const newOrder =
        await createOrder(orderData);

      setOrders(
        (previousOrders) => [
          ...previousOrders,
          newOrder,
        ],
      );

      return newOrder;
    } catch (error) {
      setError(
        error.message ||
          "Failed to create order.",
      );

      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context =
    useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext must be used inside OrderProvider.",
    );
  }

  return context;
};