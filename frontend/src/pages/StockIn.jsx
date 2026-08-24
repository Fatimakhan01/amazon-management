import { useState } from "react";

import StockInHeader from "../components/stockIn/StockInHeader";
import StockInStats from "../components/stockIn/StockInStats";
import StockInForm from "../components/stockIn/StockInForm";
import StockInTable from "../components/stockIn/StockInTable";
import Modal from "../components/Modal";

import { useStockInContext } from "../context/StockInContext";
import { useProductContext } from "../context/ProductContext";

const StockIn = () => {
  const { addStockIn } = useStockInContext();

  const { increaseProductStock } = useProductContext();

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
      increaseProductStock(data.productId, data.quantity);

      addStockIn(data);

      handleCloseModal();
    } catch (error) {
      setError(error.message || "Failed to add stock.");
    }
  };

  return (
    <div className="space-y-6">
      <StockInHeader onAddStockIn={handleOpenModal} />

      <StockInStats />

      <StockInTable />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Stock In"
        description="Record incoming inventory for an existing product."
        size="lg"
      >
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <StockInForm onSubmit={handleSubmit} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default StockIn;
