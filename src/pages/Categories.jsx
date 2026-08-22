import {
  useMemo,
  useState,
} from "react";

import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryStats from "../components/categories/CategoryStats";
import CategoryFilters from "../components/categories/CategoryFilters";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryForm from "../components/categories/CategoryForm";

import Modal from "../components/Modal";

import {
  useCategoryContext,
} from "../context/CategoryContext";

const Categories = () => {
  const {
    categories,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategoryContext();

  const [
    isCategoryModalOpen,
    setIsCategoryModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const filteredCategories =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return categories.filter(
        (category) => {
          const matchesSearch =
            !normalizedSearch ||
            category.name
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            category.description
              ?.toLowerCase()
              .includes(
                normalizedSearch
              );

          const matchesStatus =
            !statusFilter ||
            category.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      categories,
      searchTerm,
      statusFilter,
    ]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(statusFilter);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (
    category
  ) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (
    category
  ) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseCategoryModal =
    () => {
      setIsCategoryModalOpen(false);
      setSelectedCategory(null);
      setIsEditing(false);
    };

  const handleCloseDeleteModal =
    () => {
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    };

  const handleSubmitCategory = (
    formData
  ) => {
    if (
      isEditing &&
      selectedCategory
    ) {
      editCategory(
        selectedCategory.id,
        formData
      );
    } else {
      addCategory(formData);
    }

    handleCloseCategoryModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedCategory) {
      return;
    }

    removeCategory(
      selectedCategory.id
    );

    handleCloseDeleteModal();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  return (
    <div className="space-y-6">
      <CategoryHeader
        onAddCategory={
          handleAddCategory
        }
      />

      <CategoryStats />

      <CategoryFilters
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

      <CategoryTable
        categories={filteredCategories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={
          handleCloseCategoryModal
        }
        title={
          isEditing
            ? "Edit Category"
            : "Add Category"
        }
        description={
          isEditing
            ? "Update the category information below."
            : "Create a new product category."
        }
        size="md"
      >
        <CategoryForm
          initialValues={
            selectedCategory ||
            undefined
          }
          onSubmit={
            handleSubmitCategory
          }
          onCancel={
            handleCloseCategoryModal
          }
          isEditing={isEditing}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={
          handleCloseDeleteModal
        }
        title="Delete Category"
        description="This action cannot be undone."
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-gray-600">
            Are you sure you want to
            delete{" "}
            <span className="font-semibold text-gray-900">
              {selectedCategory?.name}
            </span>
            ?
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={
                handleCloseDeleteModal
              }
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={
                handleConfirmDelete
              }
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Delete Category
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;