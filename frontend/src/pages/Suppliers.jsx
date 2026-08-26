import { useMemo, useState } from "react";

import SupplierHeader from "../components/suppliers/SupplierHeader";
import SupplierStats from "../components/suppliers/SupplierStats";
import SupplierFilters from "../components/suppliers/SupplierFilters";
import SupplierTable from "../components/suppliers/SupplierTable";
import SupplierForm from "../components/suppliers/SupplierForm";
import Modal from "../components/Modal";

import { useSupplierContext } from "../context/SupplierContext";

const Suppliers = () => {
  const {
    suppliers,
    loading,
    error: supplierError,
    addSupplier,
    editSupplier,
    removeSupplier,
  } = useSupplierContext();

  const [isSupplierModalOpen, setIsSupplierModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [selectedSupplier, setSelectedSupplier] =
    useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [error, setError] = useState("");

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        !normalizedSearch ||
        supplier.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        supplier.contactPerson
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        supplier.email
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        !statusFilter || supplier.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, searchTerm, statusFilter]);

  const hasActiveFilters =
    Boolean(searchTerm) || Boolean(statusFilter);

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setIsEditing(false);
    setError("");
    setIsSupplierModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditing(true);
    setError("");
    setIsSupplierModalOpen(true);
  };

  const handleDeleteSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const closeSupplierModal = () => {
    setIsSupplierModalOpen(false);
    setSelectedSupplier(null);
    setIsEditing(false);
    setError("");
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleSubmitSupplier = async (formData) => {
    try {
      setError("");

      if (isEditing && selectedSupplier) {
        await editSupplier(selectedSupplier.id, formData);
      } else {
        await addSupplier(formData);
      }

      closeSupplierModal();
    } catch (error) {
      setError(
        error.message || "Failed to save supplier."
      );
    }
  };

  const handleConfirmDelete = async () => {
  if (!selectedSupplier) {
    return;
  }

  try {
    await removeSupplier(
      selectedSupplier.id,
    );

    handleCloseDeleteModal();
  } catch (error) {
    setError(
      error.message ||
        "Failed to delete supplier.",
    );
  }
};

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  return (
    <div className="space-y-6">
      {(error || supplierError) && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || supplierError}
        </div>
      )}

      <SupplierHeader onAddSupplier={handleAddSupplier} />

      <SupplierStats />

      <SupplierFilters
        searchTerm={searchTerm}
        status={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <SupplierTable
        suppliers={filteredSuppliers}
        onEdit={handleEditSupplier}
        onDelete={handleDeleteSupplier}
        loading={loading}
      />

      <Modal
        isOpen={isSupplierModalOpen}
        onClose={closeSupplierModal}
        title={isEditing ? "Edit Supplier" : "Add Supplier"}
        description={
          isEditing
            ? "Update supplier information."
            : "Add a new supplier to your warehouse."
        }
        size="lg"
      >
        <SupplierForm
          initialValues={selectedSupplier}
          onSubmit={handleSubmitSupplier}
          onCancel={closeSupplierModal}
          isEditing={isEditing}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Supplier"
        description="This action cannot be undone."
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {selectedSupplier?.name}
            </span>
            ?
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmDelete}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete Supplier
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Suppliers;