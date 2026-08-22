const STOCK_OUT_KEY =
  "warehouse_stock_out";

export const getStockOuts = () => {
  const storedStockOuts =
    localStorage.getItem(STOCK_OUT_KEY);

  if (!storedStockOuts) {
    return [];
  }

  try {
    return JSON.parse(storedStockOuts);
  } catch (error) {
    console.error(
      "Failed to load stock out records:",
      error
    );

    return [];
  }
};

export const createStockOut = (
  stockOutData
) => {
  const stockOuts = getStockOuts();

  const newStockOut = {
    ...stockOutData,
    id: crypto.randomUUID(),
    quantity: Number(
      stockOutData.quantity
    ),
    createdAt:
      new Date().toISOString(),
  };

  const updatedStockOuts = [
    ...stockOuts,
    newStockOut,
  ];

  localStorage.setItem(
    STOCK_OUT_KEY,
    JSON.stringify(updatedStockOuts)
  );

  return newStockOut;
};