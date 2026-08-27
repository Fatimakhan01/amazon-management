import { useState } from "react";

import WastageHeader from "../components/wastage/WastageHeader";
import WastageStats from "../components/wastage/WastageStats";
import WastageForm from "../components/wastage/WastageForm";
import WastageTable from "../components/wastage/WastageTable";

import Modal from "../components/Modal";

import { useWastageContext } from "../context/WastageContext";

const Wastage = () => {
  const { wastages, addWastage } =
    useWastageContext();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [error, setError] = useState("");

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

      await addWastage(data);

      handleCloseModal();
    } catch (error) {
      setError(
        error.message ||
          "Failed to record wastage.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <WastageHeader
        onAddWastage={handleOpenModal}
      />

      <WastageStats />

      <WastageTable
        wastages={wastages}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Record Wastage"
        description="Record damaged, expired, or wasted inventory."
        size="lg"
      >
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <WastageForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Wastage;