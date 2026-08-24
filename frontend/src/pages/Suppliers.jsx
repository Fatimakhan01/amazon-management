import {
  useMemo,
  useState,
} from "react";

import SupplierHeader from "../components/suppliers/SupplierHeader";
import SupplierStats from "../components/suppliers/SupplierStats";
import SupplierFilters from "../components/suppliers/SupplierFilters";
import SupplierTable from "../components/suppliers/SupplierTable";
import SupplierForm from "../components/suppliers/SupplierForm";
import Modal from "../components/Modal";

import {
  useSupplierContext,
} from "../context/SupplierContext";

const Suppliers = () => {
  const {
    suppliers,
    addSupplier,
    editSupplier,
    removeSupplier,
  } = useSupplierContext();

  const [
    isSupplierModalOpen,
    setIsSupplierModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedSupplier,
    setSelectedSupplier,
  ] = useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const filteredSuppliers =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return suppliers.filter(
        (supplier) => {
          const matchesSearch =
            !normalizedSearch ||
            supplier.name
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            supplier.contactPerson
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            supplier.email
              ?.toLowerCase()
              .includes(
                normalizedSearch
              );

          const matchesStatus =
            !statusFilter ||
            supplier.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      suppliers,
      searchTerm,
      statusFilter,
    ]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(statusFilter);

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setIsEditing(false);
    setIsSupplierModalOpen(true);
  };

  const handleEditSupplier = (
    supplier
  ) => {
    setSelectedSupplier(supplier);
    setIsEditing(true);
    setIsSupplierModalOpen(true);
  };

  const handleDeleteSupplier = (
    supplier
  ) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const closeSupplierModal = () => {
    setIsSupplierModalOpen(false);
    setSelectedSupplier(null);
    setIsEditing(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleSubmitSupplier = (
    formData
  ) => {
    if (
      isEditing &&
      selectedSupplier
    ) {
      editSupplier(
        selectedSupplier.id,
        formData
      );
    } else {
      addSupplier(formData);
    }

    closeSupplierModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedSupplier) {
      return;
    }

    removeSupplier(
      selectedSupplier.id
    );

    closeDeleteModal();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  return (
    <div className="space-y-6">
      <SupplierHeader
        onAddSupplier={
          handleAddSupplier
        }
      />

      <SupplierStats />

      <SupplierFilters
        searchTerm={searchTerm}
        status={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={
          setStatusFilter
        }
        onClearFilters={
          handleClearFilters
        }
        hasActiveFilters={
          hasActiveFilters
        }
      />

      <SupplierTable
        suppliers={filteredSuppliers}
        onEdit={handleEditSupplier}
        onDelete={
          handleDeleteSupplier
        }
      />

      <Modal
        isOpen={isSupplierModalOpen}
        onClose={closeSupplierModal}
        title={
          isEditing
            ? "Edit Supplier"
            : "Add Supplier"
        }
        description={
          isEditing
            ? "Update supplier information."
            : "Add a new supplier to your warehouse."
        }
        size="lg"
      >
        <SupplierForm
          initialValues={
            selectedSupplier
          }
          onSubmit={
            handleSubmitSupplier
          }
          onCancel={
            closeSupplierModal
          }
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
            Are you sure you want to
            delete{" "}
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
              onClick={
                handleConfirmDelete
              }
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