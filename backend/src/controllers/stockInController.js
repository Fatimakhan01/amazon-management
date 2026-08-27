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

export const getStockIns = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        si.id,
        si.product_id,
        si.supplier_id,
        si.quantity,
        si.date,
        si.note,
        si.created_at,
        p.name AS product_name,
        p.sku AS product_sku,
        s.name AS supplier_name
      FROM stock_ins si
      JOIN products p
        ON si.product_id = p.id
      LEFT JOIN suppliers s
        ON si.supplier_id = s.id
      ORDER BY si.created_at DESC
    `);

    res.status(200).json({
      stockIns: result.rows,
    });
  } catch (error) {
    console.error(
      "Get stock in records error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to fetch stock in records.",
    });
  }
};

export const createStockIn = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      productId,
      supplierId,
      quantity,
      date,
      note,
    } = req.body;

    const numericQuantity = Number(quantity);

    if (!productId) {
      return res.status(400).json({
        message: "Product is required.",
      });
    }

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
        SELECT id, quantity
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

    if (supplierId) {
      const supplierResult = await client.query(
        `
          SELECT id
          FROM suppliers
          WHERE id = $1
        `,
        [supplierId],
      );

      if (supplierResult.rows.length === 0) {
        await client.query("ROLLBACK");

        return res.status(404).json({
          message: "Supplier not found.",
        });
      }
    }

    const currentQuantity = Number(
      productResult.rows[0].quantity,
    );

    const updatedQuantity =
      currentQuantity + numericQuantity;

    const status = getProductStatus(
      updatedQuantity,
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
        updatedQuantity,
        status,
        productId,
      ],
    );

    const stockInResult = await client.query(
      `
        INSERT INTO stock_ins (
          product_id,
          supplier_id,
          quantity,
          date,
          note
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          product_id,
          supplier_id,
          quantity,
          date,
          note,
          created_at
      `,
      [
        productId,
        supplierId || null,
        numericQuantity,
        date,
        note?.trim() || null,
      ],
    );

    const stockIn = stockInResult.rows[0];

    const detailsResult = await client.query(
      `
        SELECT
          si.id,
          si.product_id,
          si.supplier_id,
          si.quantity,
          si.date,
          si.note,
          si.created_at,
          p.name AS product_name,
          p.sku AS product_sku,
          s.name AS supplier_name
        FROM stock_ins si
        JOIN products p
          ON si.product_id = p.id
        LEFT JOIN suppliers s
          ON si.supplier_id = s.id
        WHERE si.id = $1
      `,
      [stockIn.id],
    );

    await client.query("COMMIT");

    res.status(201).json({
      stockIn: detailsResult.rows[0],
      updatedProduct: {
        id: productId,
        quantity: updatedQuantity,
        status,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "Create stock in error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to create stock in record.",
    });
  } finally {
    client.release();
  }
};