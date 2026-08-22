const STOCK_IN_KEY =
  "warehouse_stock_in";

export const getStockIns = () => {
  const storedStockIns =
    localStorage.getItem(STOCK_IN_KEY);

  if (!storedStockIns) {
    return [];
  }

  try {
    return JSON.parse(storedStockIns);
  } catch (error) {
    console.error(
      "Failed to load stock in records:",
      error
    );

    return [];
  }
};

export const createStockIn = (
  stockInData
) => {
  const stockIns = getStockIns();

  const newStockIn = {
    ...stockInData,
    id: crypto.randomUUID(),
    quantity: Number(
      stockInData.quantity
    ),
    createdAt:
      new Date().toISOString(),
  };

  const updatedStockIns = [
    ...stockIns,
    newStockIn,
  ];

  localStorage.setItem(
    STOCK_IN_KEY,
    JSON.stringify(updatedStockIns)
  );

  return newStockIn;
};