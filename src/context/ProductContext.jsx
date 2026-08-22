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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = getProducts();

    setProducts(storedProducts);
    setLoading(false);
  }, []);

  const addProduct = (productData) => {
    const newProduct =
      createProduct(productData);

    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct,
    ]);
  };

  const editProduct = (
    productId,
    productData
  ) => {
    const updatedProduct =
      updateProduct(
        productId,
        productData
      );

    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === productId
          ? updatedProduct
          : product
      )
    );
  };

  const removeProduct = (productId) => {
    const updatedProducts =
      deleteProduct(productId);

    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        editProduct,
        removeProduct,
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
      "useProductContext must be used inside ProductProvider"
    );
  }

  return context;
};