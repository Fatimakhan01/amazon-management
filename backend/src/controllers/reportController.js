import pool from "../config/db.js";

export const getReports = async (req, res) => {
  try {
    const [
      inventoryResult,
      salesResult,
      stockMovementResult,
      wastageResult,
    ] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*)::INTEGER AS total_products,
          COALESCE(SUM(quantity), 0)::INTEGER AS total_stock,
          COALESCE(SUM(cost_price * quantity), 0)::NUMERIC AS inventory_cost,
          COALESCE(SUM(selling_price * quantity), 0)::NUMERIC AS inventory_value,
          COUNT(*) FILTER (
            WHERE quantity > 0 AND quantity <= 5
          )::INTEGER AS low_stock_products,
          COUNT(*) FILTER (
            WHERE quantity <= 0
          )::INTEGER AS out_of_stock_products
        FROM products
      `),

      pool.query(`
        SELECT
          COUNT(*)::INTEGER AS total_orders,
          COALESCE(SUM(revenue), 0)::NUMERIC AS revenue,
          COUNT(*) FILTER (
            WHERE status = 'Completed'
          )::INTEGER AS completed_orders,
          COUNT(*) FILTER (
            WHERE status = 'Pending'
          )::INTEGER AS pending_orders,
          COUNT(*) FILTER (
            WHERE status = 'Cancelled'
          )::INTEGER AS cancelled_orders
        FROM orders
      `),

      pool.query(`
        SELECT
          (
            SELECT COALESCE(SUM(quantity), 0)
            FROM stock_ins
          )::INTEGER AS total_stock_in,
          (
            SELECT COALESCE(SUM(quantity), 0)
            FROM stock_outs
          )::INTEGER AS total_stock_out
      `),

      pool.query(`
        SELECT
          COALESCE(SUM(quantity), 0)::INTEGER AS total_wastage_quantity,
          COALESCE(SUM(loss), 0)::NUMERIC AS total_wastage_loss
        FROM wastages
      `),
    ]);

    const inventory = inventoryResult.rows[0];
    const sales = salesResult.rows[0];
    const stockMovement = stockMovementResult.rows[0];
    const wastage = wastageResult.rows[0];

    const totalStockIn = Number(
      stockMovement.total_stock_in || 0,
    );

    const totalStockOut = Number(
      stockMovement.total_stock_out || 0,
    );

    res.status(200).json({
      inventoryStats: {
        totalProducts: Number(inventory.total_products || 0),
        totalStock: Number(inventory.total_stock || 0),
        inventoryCost: Number(inventory.inventory_cost || 0),
        inventoryValue: Number(inventory.inventory_value || 0),
        lowStockProducts: Number(
          inventory.low_stock_products || 0,
        ),
        outOfStockProducts: Number(
          inventory.out_of_stock_products || 0,
        ),
      },

      salesStats: {
        totalOrders: Number(sales.total_orders || 0),
        revenue: Number(sales.revenue || 0),
        completedOrders: Number(
          sales.completed_orders || 0,
        ),
        pendingOrders: Number(
          sales.pending_orders || 0,
        ),
        cancelledOrders: Number(
          sales.cancelled_orders || 0,
        ),
      },

      stockMovementStats: {
        totalStockIn,
        totalStockOut,
        netMovement: totalStockIn - totalStockOut,
      },

      wastageStats: {
        totalWastageQuantity: Number(
          wastage.total_wastage_quantity || 0,
        ),
        totalWastageLoss: Number(
          wastage.total_wastage_loss || 0,
        ),
      },
    });
  } catch (error) {
    console.error(
      "Get reports error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to fetch reports.",
    });
  }
};