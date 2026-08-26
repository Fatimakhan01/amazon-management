import pool from "../config/db.js";

export const getSuppliers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        address,
        status,
        created_at
      FROM suppliers
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      suppliers: result.rows,
    });
  } catch (error) {
    console.error("Get suppliers error:", error.message);

    res.status(500).json({
      message: "Failed to fetch suppliers.",
    });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      status,
    } = req.body;

    const normalizedName = name?.trim();

    if (!normalizedName) {
      return res.status(400).json({
        message: "Supplier name is required.",
      });
    }

    const existingSupplier = await pool.query(
      `
        SELECT id
        FROM suppliers
        WHERE LOWER(name) = LOWER($1)
      `,
      [normalizedName],
    );

    if (existingSupplier.rows.length > 0) {
      return res.status(409).json({
        message: "A supplier with this name already exists.",
      });
    }

    const result = await pool.query(
      `
        INSERT INTO suppliers (
          name,
          email,
          phone,
          address,
          status
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          name,
          email,
          phone,
          address,
          status,
          created_at
      `,
      [
        normalizedName,
        email?.trim() || null,
        phone?.trim() || null,
        address?.trim() || null,
        status || "Active",
      ],
    );

    res.status(201).json({
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error("Create supplier error:", error.message);

    res.status(500).json({
      message: "Failed to create supplier.",
    });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      address,
      status,
    } = req.body;

    const normalizedName = name?.trim();

    if (!normalizedName) {
      return res.status(400).json({
        message: "Supplier name is required.",
      });
    }

    const existingSupplier = await pool.query(
      `
        SELECT id
        FROM suppliers
        WHERE LOWER(name) = LOWER($1)
          AND id != $2
      `,
      [normalizedName, id],
    );

    if (existingSupplier.rows.length > 0) {
      return res.status(409).json({
        message: "A supplier with this name already exists.",
      });
    }

    const result = await pool.query(
      `
        UPDATE suppliers
        SET
          name = $1,
          email = $2,
          phone = $3,
          address = $4,
          status = $5
        WHERE id = $6
        RETURNING
          id,
          name,
          email,
          phone,
          address,
          status,
          created_at
      `,
      [
        normalizedName,
        email?.trim() || null,
        phone?.trim() || null,
        address?.trim() || null,
        status || "Active",
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Supplier not found.",
      });
    }

    res.status(200).json({
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error("Update supplier error:", error.message);

    res.status(500).json({
      message: "Failed to update supplier.",
    });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM suppliers
        WHERE id = $1
        RETURNING id
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Supplier not found.",
      });
    }

    res.status(200).json({
      message: "Supplier deleted successfully.",
    });
  } catch (error) {
    console.error("Delete supplier error:", error.message);

    res.status(500).json({
      message: "Failed to delete supplier.",
    });
  }
};