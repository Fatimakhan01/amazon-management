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

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.sku,
        p.barcode,
        p.category_id AS "categoryId",
        p.supplier_id AS "supplierId",
        p.cost_price AS "costPrice",
        p.selling_price AS "sellingPrice",
        p.quantity,
        p.status,
        p.created_at AS "createdAt",
        c.name AS "categoryName",
        s.name AS "supplierName"
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      LEFT JOIN suppliers s
        ON p.supplier_id = s.id
      ORDER BY p.created_at DESC
    `);

    res.status(200).json({
      products: result.rows,
    });
  } catch (error) {
    console.error("Get products error:", error.message);

    res.status(500).json({
      message: "Failed to fetch products.",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      barcode,
      categoryId,
      supplierId,
      costPrice,
      sellingPrice,
      quantity,
    } = req.body;

    const normalizedName = name?.trim();
    const normalizedSku = sku?.trim();
    const normalizedBarcode = barcode?.trim();

    if (!normalizedName) {
      return res.status(400).json({
        message: "Product name is required.",
      });
    }

    if (!normalizedSku) {
      return res.status(400).json({
        message: "SKU is required.",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        message: "Category is required.",
      });
    }

    if (!supplierId) {
      return res.status(400).json({
        message: "Supplier is required.",
      });
    }

    const numericCostPrice = Number(costPrice);
    const numericSellingPrice = Number(sellingPrice);
    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericCostPrice) ||
      numericCostPrice < 0
    ) {
      return res.status(400).json({
        message: "Cost price must be a valid positive number.",
      });
    }

    if (
      !Number.isFinite(numericSellingPrice) ||
      numericSellingPrice < 0
    ) {
      return res.status(400).json({
        message: "Selling price must be a valid positive number.",
      });
    }

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity < 0
    ) {
      return res.status(400).json({
        message: "Quantity must be a valid positive number.",
      });
    }

    const existingProduct = await pool.query(
      `
        SELECT id
        FROM products
        WHERE LOWER(sku) = LOWER($1)
      `,
      [normalizedSku],
    );

    if (existingProduct.rows.length > 0) {
      return res.status(409).json({
        message: "A product with this SKU already exists.",
      });
    }

    if (normalizedBarcode) {
      const existingBarcode = await pool.query(
        `
          SELECT id
          FROM products
          WHERE barcode = $1
        `,
        [normalizedBarcode],
      );

      if (existingBarcode.rows.length > 0) {
        return res.status(409).json({
          message: "A product with this barcode already exists.",
        });
      }
    }

    const status = getProductStatus(numericQuantity);

    const result = await pool.query(
      `
        INSERT INTO products (
          name,
          sku,
          barcode,
          category_id,
          supplier_id,
          cost_price,
          selling_price,
          quantity,
          status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING
          id,
          name,
          sku,
          barcode,
          category_id AS "categoryId",
          supplier_id AS "supplierId",
          cost_price AS "costPrice",
          selling_price AS "sellingPrice",
          quantity,
          status,
          created_at AS "createdAt"
      `,
      [
        normalizedName,
        normalizedSku,
        normalizedBarcode || null,
        categoryId,
        supplierId,
        numericCostPrice,
        numericSellingPrice,
        numericQuantity,
        status,
      ],
    );

    res.status(201).json({
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Create product error:", error.message);

    res.status(500).json({
      message: "Failed to create product.",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      sku,
      barcode,
      categoryId,
      supplierId,
      costPrice,
      sellingPrice,
      quantity,
    } = req.body;

    const normalizedName = name?.trim();
    const normalizedSku = sku?.trim();
    const normalizedBarcode = barcode?.trim();

    if (!normalizedName) {
      return res.status(400).json({
        message: "Product name is required.",
      });
    }

    if (!normalizedSku) {
      return res.status(400).json({
        message: "SKU is required.",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        message: "Category is required.",
      });
    }

    if (!supplierId) {
      return res.status(400).json({
        message: "Supplier is required.",
      });
    }

    const numericCostPrice = Number(costPrice);
    const numericSellingPrice = Number(sellingPrice);
    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericCostPrice) ||
      numericCostPrice < 0
    ) {
      return res.status(400).json({
        message: "Cost price must be a valid positive number.",
      });
    }

    if (
      !Number.isFinite(numericSellingPrice) ||
      numericSellingPrice < 0
    ) {
      return res.status(400).json({
        message: "Selling price must be a valid positive number.",
      });
    }

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity < 0
    ) {
      return res.status(400).json({
        message: "Quantity must be a valid positive number.",
      });
    }

    const duplicateProduct = await pool.query(
      `
        SELECT id
        FROM products
        WHERE LOWER(sku) = LOWER($1)
          AND id != $2
      `,
      [normalizedSku, id],
    );

    if (duplicateProduct.rows.length > 0) {
      return res.status(409).json({
        message: "A product with this SKU already exists.",
      });
    }

    if (normalizedBarcode) {
      const duplicateBarcode = await pool.query(
        `
          SELECT id
          FROM products
          WHERE barcode = $1
            AND id != $2
        `,
        [normalizedBarcode, id],
      );

      if (duplicateBarcode.rows.length > 0) {
        return res.status(409).json({
          message: "A product with this barcode already exists.",
        });
      }
    }

    const status = getProductStatus(numericQuantity);

    const result = await pool.query(
      `
        UPDATE products
        SET
          name = $1,
          sku = $2,
          barcode = $3,
          category_id = $4,
          supplier_id = $5,
          cost_price = $6,
          selling_price = $7,
          quantity = $8,
          status = $9
        WHERE id = $10
        RETURNING
          id,
          name,
          sku,
          barcode,
          category_id AS "categoryId",
          supplier_id AS "supplierId",
          cost_price AS "costPrice",
          selling_price AS "sellingPrice",
          quantity,
          status,
          created_at AS "createdAt"
      `,
      [
        normalizedName,
        normalizedSku,
        normalizedBarcode || null,
        categoryId,
        supplierId,
        numericCostPrice,
        numericSellingPrice,
        numericQuantity,
        status,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Update product error:", error.message);

    res.status(500).json({
      message: "Failed to update product.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM products
        WHERE id = $1
        RETURNING id
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete product error:", error.message);

    res.status(500).json({
      message: "Failed to delete product.",
    });
  }
};