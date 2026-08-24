import { useState } from "react";

import StockOutHeader from "../components/stockOut/StockOutHeader";
import StockOutStats from "../components/stockOut/StockOutStats";
import StockOutForm from "../components/stockOut/StockOutForm";
import StockOutTable from "../components/stockOut/StockOutTable";
import Modal from "../components/Modal";

import { useStockOutContext } from "../context/StockOutContext";

import { useProductContext } from "../context/ProductContext";

const StockOut = () => {
  const { addStockOut } = useStockOutContext();

  const { decreaseProductStock } = useProductContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setError("");
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    try {
      decreaseProductStock(data.productId, data.quantity);

      addStockOut(data);

      handleCloseModal();
    } catch (error) {
      setError(error.message || "Failed to remove stock.");
    }
  };

  return (
    <div className="space-y-6">
      <StockOutHeader onAddStockOut={handleOpenModal} />

      <StockOutStats />

      <StockOutTable />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Stock Out"
        description="Record outgoing inventory for an existing product."
        size="lg"
      >
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <StockOutForm onSubmit={handleSubmit} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default StockOut;
