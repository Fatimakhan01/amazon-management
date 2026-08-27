import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const ProductContext = createContext(null);

export const ProductProvider = ({
  children,
}) => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(
        error.message ||
          "Failed to load products.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (
    productData,
  ) => {
    const newProduct =
      await createProduct(productData);

    setProducts(
      (previousProducts) => [
        newProduct,
        ...previousProducts,
      ],
    );

    return newProduct;
  };

  const editProduct = async (
    productId,
    productData,
  ) => {
    const updatedProduct =
      await updateProduct(
        productId,
        productData,
      );

    setProducts(
      (previousProducts) =>
        previousProducts.map(
          (product) =>
            product.id === productId
              ? updatedProduct
              : product,
        ),
    );

    return updatedProduct;
  };

  const removeProduct = async (
    productId,
  ) => {
    await deleteProduct(productId);

    setProducts(
      (previousProducts) =>
        previousProducts.filter(
          (product) =>
            product.id !== productId,
        ),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        editProduct,
        removeProduct,
        reloadProducts:
          loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context =
    useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProductContext must be used inside ProductProvider.",
    );
  }

  return context;
};