export const calculateOrderRevenue = (sellingPrice, quantity) => {
  return Number(sellingPrice || 0) * Number(quantity || 0);
};

export const calculateOrderProfit = (sellingPrice, costPrice, quantity) => {
  const profitPerUnit = Number(sellingPrice || 0) - Number(costPrice || 0);

  return profitPerUnit * Number(quantity || 0);
};
