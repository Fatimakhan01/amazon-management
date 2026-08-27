import pool from "../config/db.js";

const calculateWastageLoss = (costPrice, quantity) => {
  return costPrice * quantity;
};

export const getWastages = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        w.id,
        w.product_id,
        p.name AS product_name,
        p.sku,
        w.quantity,
        w.cost_price,
        w.loss,
        w.reason,
        w.date,
        w.created_at
      FROM wastages w
      LEFT JOIN products p
        ON w.product_id = p.id
      ORDER BY w.created_at DESC
    `);

    res.status(200).json({
      wastages: result.rows,
    });
  } catch (error) {
    console.error("Get wastages error:", error.message);

    res.status(500).json({
      message: "Failed to fetch wastage records.",
    });
  }
};

export const createWastage = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      productId,
      quantity,
      reason,
      date,
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

    if (!reason?.trim()) {
      return res.status(400).json({
        message: "Wastage reason is required.",
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
          name,
          sku,
          cost_price,
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

    const currentQuantity = Number(product.quantity);
    const costPrice = Number(product.cost_price);

    if (numericQuantity > currentQuantity) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: `Only ${currentQuantity} units are available.`,
      });
    }

    const loss = calculateWastageLoss(
      costPrice,
      numericQuantity,
    );

    const newQuantity =
      currentQuantity - numericQuantity;

    const stockStatus =
      newQuantity <= 0
        ? "Out of Stock"
        : newQuantity <= 5
          ? "Low Stock"
          : "In Stock";

    const wastageResult = await client.query(
      `
        INSERT INTO wastages (
          product_id,
          quantity,
          cost_price,
          loss,
          reason,
          date
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING
          id,
          product_id,
          quantity,
          cost_price,
          loss,
          reason,
          date,
          created_at
      `,
      [
        productId,
        numericQuantity,
        costPrice,
        loss,
        reason.trim(),
        date,
      ],
    );

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
        stockStatus,
        productId,
      ],
    );

    await client.query("COMMIT");

    res.status(201).json({
      wastage: {
        ...wastageResult.rows[0],
        product_name: product.name,
        sku: product.sku,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "Create wastage error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to create wastage record.",
    });
  } finally {
    client.release();
  }
};

export const deleteWastage = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const wastageResult = await client.query(
      `
        SELECT
          id,
          product_id,
          quantity
        FROM wastages
        WHERE id = $1
        FOR UPDATE
      `,
      [id],
    );

    if (wastageResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Wastage record not found.",
      });
    }

    const wastage = wastageResult.rows[0];

    const productResult = await client.query(
      `
        SELECT
          id,
          quantity
        FROM products
        WHERE id = $1
        FOR UPDATE
      `,
      [wastage.product_id],
    );

    if (productResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Product not found.",
      });
    }

    const product = productResult.rows[0];

    const restoredQuantity =
      Number(product.quantity) +
      Number(wastage.quantity);

    const stockStatus =
      restoredQuantity <= 0
        ? "Out of Stock"
        : restoredQuantity <= 5
          ? "Low Stock"
          : "In Stock";

    await client.query(
      `
        UPDATE products
        SET
          quantity = $1,
          status = $2
        WHERE id = $3
      `,
      [
        restoredQuantity,
        stockStatus,
        wastage.product_id,
      ],
    );

    await client.query(
      `
        DELETE FROM wastages
        WHERE id = $1
      `,
      [id],
    );

    await client.query("COMMIT");

    res.status(200).json({
      message: "Wastage deleted successfully.",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "Delete wastage error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to delete wastage.",
    });
  } finally {
    client.release();
  }
};