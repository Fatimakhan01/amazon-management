import pool from "../config/db.js";

const getProductStatus = (quantity) => {
  const stock = Number(quantity);

  if (stock <= 0) {
    return "Out of Stock";
  }

  if (stock <= 5) {
    return "Low Stock";
  }

  return "In Stock";
};

export const getOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        o.id,
        o.product_id,
        o.customer_name,
        o.quantity,
        o.selling_price,
        o.cost_price,
        o.revenue,
        o.profit,
        o.status,
        o.date,
        o.created_at,
        p.name AS product_name,
        p.sku
      FROM orders o
      LEFT JOIN products p
        ON o.product_id = p.id
      ORDER BY o.created_at DESC
    `);

    res.status(200).json({
      orders: result.rows,
    });
  } catch (error) {
    console.error("Get orders error:", error.message);

    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
};

export const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      productId,
      customerName,
      quantity,
      sellingPrice,
      costPrice,
      status,
      date,
    } = req.body;

    const normalizedCustomerName =
      customerName?.trim();

    if (!productId) {
      return res.status(400).json({
        message: "Product is required.",
      });
    }

    if (!normalizedCustomerName) {
      return res.status(400).json({
        message: "Customer name is required.",
      });
    }

    const numericQuantity = Number(quantity);
    const numericSellingPrice = Number(sellingPrice);
    const numericCostPrice = Number(costPrice);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0
    ) {
      return res.status(400).json({
        message: "Quantity must be greater than zero.",
      });
    }

    if (
      !Number.isFinite(numericSellingPrice) ||
      numericSellingPrice < 0
    ) {
      return res.status(400).json({
        message: "Selling price must be a valid number.",
      });
    }

    if (
      !Number.isFinite(numericCostPrice) ||
      numericCostPrice < 0
    ) {
      return res.status(400).json({
        message: "Cost price must be a valid number.",
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Date is required.",
      });
    }

    await client.query("BEGIN");

    const productResult = await client.query(
      `
        SELECT
          id,
          quantity,
          selling_price,
          cost_price
        FROM products
        WHERE id = $1
        FOR UPDATE
      `,
      [productId],
    );

    if (productResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Product not found.",
      });
    }

    const product = productResult.rows[0];

    const currentQuantity = Number(
      product.quantity || 0,
    );

    if (numericQuantity > currentQuantity) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: `Insufficient stock. Available quantity is ${currentQuantity}.`,
      });
    }

    const newQuantity =
      currentQuantity - numericQuantity;

    const productStatus =
      getProductStatus(newQuantity);

    const revenue =
      numericSellingPrice * numericQuantity;

    const profit =
      (numericSellingPrice -
        numericCostPrice) *
      numericQuantity;

    await client.query(
      `
        UPDATE products
        SET
          quantity = $1,
          status = $2
        WHERE id = $3
      `,
      [
        newQuantity,
        productStatus,
        productId,
      ],
    );

    const result = await client.query(
      `
        INSERT INTO orders (
          product_id,
          customer_name,
          quantity,
          selling_price,
          cost_price,
          revenue,
          profit,
          status,
          date
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9
        )
        RETURNING
          id,
          product_id,
          customer_name,
          quantity,
          selling_price,
          cost_price,
          revenue,
          profit,
          status,
          date,
          created_at
      `,
      [
        productId,
        normalizedCustomerName,
        numericQuantity,
        numericSellingPrice,
        numericCostPrice,
        revenue,
        profit,
        status || "Pending",
        date,
      ],
    );

    await client.query("COMMIT");

    res.status(201).json({
      order: result.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Create order error:", error.message);

    res.status(500).json({
      message: "Failed to create order.",
    });
  } finally {
    client.release();
  }
};