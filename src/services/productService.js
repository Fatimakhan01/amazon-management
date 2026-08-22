const PRODUCTS_KEY = "warehouse_products";

export const getProducts = () => {
  const storedProducts =
    localStorage.getItem(PRODUCTS_KEY);

  if (!storedProducts) {
    return [];
  }

  try {
    return JSON.parse(storedProducts);
  } catch (error) {
    console.error(
      "Failed to parse products:",
      error
    );

    return [];
  }
};

const saveProducts = (products) => {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
};

export const createProduct = (productData) => {
  const products = getProducts();

  const newProduct = {
    ...productData,
    id: crypto.randomUUID(),
    quantity: Number(
      productData.quantity || 0
    ),
    costPrice: Number(
      productData.costPrice || 0
    ),
    sellingPrice: Number(
      productData.sellingPrice || 0
    ),
  };

  const updatedProducts = [
    ...products,
    newProduct,
  ];

  saveProducts(updatedProducts);

  return newProduct;
};

export const updateProduct = (
  productId,
  productData
) => {
  const products = getProducts();

  const updatedProduct = {
    ...productData,
    id: productId,
    quantity: Number(
      productData.quantity || 0
    ),
    costPrice: Number(
      productData.costPrice || 0
    ),
    sellingPrice: Number(
      productData.sellingPrice || 0
    ),
  };

  const updatedProducts = products.map(
    (product) =>
      product.id === productId
        ? updatedProduct
        : product
  );

  saveProducts(updatedProducts);

  return updatedProduct;
};

export const deleteProduct = (productId) => {
  const products = getProducts();

  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );

  saveProducts(updatedProducts);

  return updatedProducts;
};