export const calculateInventoryStats = (products) => {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0,
  );

  const inventoryCost = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0) * Number(product.costPrice || 0),
    0,
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0) * Number(product.sellingPrice || 0),
    0,
  );

  const lowStockProducts = products.filter((product) => {
    const quantity = Number(product.quantity || 0);

    return quantity > 0 && quantity < 10;
  }).length;

  const outOfStockProducts = products.filter(
    (product) => Number(product.quantity || 0) === 0,
  ).length;

  return {
    totalProducts,
    totalStock,
    inventoryCost,
    inventoryValue,
    lowStockProducts,
    outOfStockProducts,
  };
};

export const calculateSalesStats = (orders) => {
  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  const revenue = orders.reduce((total, order) => {
    if (order.status === "Cancelled") {
      return total;
    }

    return total + Number(order.totalAmount || order.total || 0);
  }, 0);

  return {
    totalOrders,
    completedOrders,
    pendingOrders,
    cancelledOrders,
    revenue,
  };
};

export const calculateStockMovementStats = (stockIns, stockOuts) => {
  const totalStockIn = stockIns.reduce(
    (total, stockIn) => total + Number(stockIn.quantity || 0),
    0,
  );

  const totalStockOut = stockOuts.reduce(
    (total, stockOut) => total + Number(stockOut.quantity || 0),
    0,
  );

  return {
    totalStockIn,
    totalStockOut,
    netMovement: totalStockIn - totalStockOut,
  };
};

export const calculateWastageStats = (wastage) => {
  const totalWastageQuantity = wastage.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const totalWastageLoss = wastage.reduce(
    (total, item) => total + Number(item.loss || item.totalLoss || 0),
    0,
  );

  return {
    totalWastageQuantity,
    totalWastageLoss,
  };
};
