import { createContext, useContext, useEffect, useState } from "react";
import {getProducts,createProduct,updateProduct,deleteProduct,} from "../services/productService";
const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = getProducts();

    setProducts(storedProducts);
    setLoading(false);
  }, []);

  const addProduct = (productData) => {
    const newProduct = createProduct(productData);

    setProducts((previousProducts) => [...previousProducts, newProduct]);

    return newProduct;
  };

  const editProduct = (productId, productData) => {
    const updatedProduct = updateProduct(productId, productData);

    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === productId ? updatedProduct : product,
      ),
    );

    return updatedProduct;
  };

  const removeProduct = (productId) => {
    const updatedProducts = deleteProduct(productId);

    setProducts(updatedProducts);
  };

  const increaseProductStock = (productId, quantity) => {
    const product = products.find((item) => item.id === productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const stockQuantity = Number(quantity);

    if (!Number.isFinite(stockQuantity) || stockQuantity <= 0) {
      throw new Error("Stock quantity must be greater than zero.");
    }

    const currentQuantity = Number(product.quantity || 0);

    const newQuantity = currentQuantity + stockQuantity;

    return editProduct(productId, {
      ...product,
      quantity: newQuantity,
    });
  };

  const decreaseProductStock = (productId, quantity) => {
    const product = products.find((item) => item.id === productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const stockQuantity = Number(quantity);

    if (!Number.isFinite(stockQuantity) || stockQuantity <= 0) {
      throw new Error("Stock quantity must be greater than zero.");
    }

    const currentQuantity = Number(product.quantity || 0);

    if (stockQuantity > currentQuantity) {
      throw new Error(
        `Insufficient stock. Available quantity is ${currentQuantity}.`,
      );
    }

    const newQuantity = currentQuantity - stockQuantity;

    return editProduct(productId, {
      ...product,
      quantity: newQuantity,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        editProduct,
        removeProduct,
        increaseProductStock,
        decreaseProductStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used inside ProductProvider.");
  }

  return context;
};
