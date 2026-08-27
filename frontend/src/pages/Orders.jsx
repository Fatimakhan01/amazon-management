import { useState } from "react";

import OrderHeader from "../components/orders/OrderHeader";
import OrderStats from "../components/orders/OrderStats";
import OrderForm from "../components/orders/OrderForm";
import OrderTable from "../components/orders/OrderTable";

import Modal from "../components/Modal";

import { useOrderContext } from "../context/OrderContext";

const Orders = () => {
  const { orders, addOrder } =
    useOrderContext();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleOpenModal = () => {
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setError("");
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      setError("");

      await addOrder(data);

      handleCloseModal();
    } catch (error) {
      setError(
        error.message ||
          "Failed to create order.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <OrderHeader
        onAddOrder={handleOpenModal}
      />

      <OrderStats />

      <OrderTable orders={orders} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create Order"
        description="Create a new warehouse order."
        size="lg"
      >
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <OrderForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Orders;