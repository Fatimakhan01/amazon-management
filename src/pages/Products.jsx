import {
  useMemo,
  useState,
} from "react";

import ProductHeader from "../components/products/ProductHeader";
import ProductStats from "../components/products/ProductStats";
import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import ProductForm from "../components/products/ProductForm";
import Modal from "../components/Modal";

import {
  useProductContext,
} from "../context/ProductContext";

const Products = () => {
  const {
    products,
    addProduct,
    editProduct,
    removeProduct,
  } = useProductContext();

  const [
    isProductModalOpen,
    setIsProductModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        product.sku
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        product.barcode
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        !categoryFilter ||
        product.category ===
          categoryFilter;

      const matchesStatus =
        !statusFilter ||
        product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    searchTerm,
    categoryFilter,
    statusFilter,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setStatusFilter("");
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(categoryFilter) ||
    Boolean(statusFilter);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmitProduct = (
    formData
  ) => {
    if (
      isEditing &&
      selectedProduct
    ) {
      editProduct(
        selectedProduct.id,
        formData
      );
    } else {
      addProduct(formData);
    }

    handleCloseProductModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) {
      return;
    }

    removeProduct(
      selectedProduct.id
    );

    handleCloseDeleteModal();
  };

  return (
    <div className="space-y-6">
      <ProductHeader
        onAddProduct={handleAddProduct}
      />

      <ProductStats />

      <ProductFilters
        searchTerm={searchTerm}
        category={categoryFilter}
        status={statusFilter}
        onSearchChange={setSearchTerm}
        onCategoryChange={
          setCategoryFilter
        }
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

      <ProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <Modal
        isOpen={isProductModalOpen}
        onClose={
          handleCloseProductModal
        }
        title={
          isEditing
            ? "Edit Product"
            : "Add Product"
        }
        description={
          isEditing
            ? "Update the product information below."
            : "Add a new product to your warehouse inventory."
        }
        size="lg"
      >
        <ProductForm
          initialValues={
            selectedProduct ||
            undefined
          }
          onSubmit={
            handleSubmitProduct
          }
          onCancel={
            handleCloseProductModal
          }
          isEditing={isEditing}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={
          handleCloseDeleteModal
        }
        title="Delete Product"
        description="This action cannot be undone."
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-gray-600">
            Are you sure you want to
            delete{" "}
            <span className="font-semibold text-gray-900">
              {selectedProduct?.name}
            </span>
            ?
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={
                handleCloseDeleteModal
              }
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
              Delete Product
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;