export const LOW_STOCK_THRESHOLD = 10;

export const getProductStatus = (quantity) => {
  const stockQuantity = Number(quantity || 0);

  if (stockQuantity <= 0) {
    return "Out of Stock";
  }

  if (stockQuantity < LOW_STOCK_THRESHOLD) {
    return "Low Stock";
  }

  return "In Stock";
};