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

export const getStockOuts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        so.id,
        so.product_id,
        so.quantity,
        so.reason,
        so.date,
        so.note,
        so.created_at,
        p.name AS product_name,
        p.sku
      FROM stock_outs so
      LEFT JOIN products p
        ON so.product_id = p.id
      ORDER BY so.created_at DESC
    `);

    res.status(200).json({
      stockOuts: result.rows,
    });
  } catch (error) {
    console.error("Get stock outs error:", error.message);

    res.status(500).json({
      message: "Failed to fetch stock out records.",
    });
  }
};

export const createStockOut = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      productId,
      quantity,
      reason,
      date,
      note,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product is required.",
      });
    }

    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0
    ) {
      return res.status(400).json({
        message: "Quantity must be greater than zero.",
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
          quantity
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

    const status = getProductStatus(newQuantity);

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
        status,
        productId,
      ],
    );

    const result = await client.query(
      `
        INSERT INTO stock_outs (
          product_id,
          quantity,
          reason,
          date,
          note
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          product_id,
          quantity,
          reason,
          date,
          note,
          created_at
      `,
      [
        productId,
        numericQuantity,
        reason || "Customer Order",
        date,
        note?.trim() || null,
      ],
    );

    await client.query("COMMIT");

    res.status(201).json({
      stockOut: result.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "Create stock out error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to create stock out record.",
    });
  } finally {
    client.release();
  }
};