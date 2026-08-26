import pool from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          id,
          name,
          description,
          status,
          date,
          created_at
        FROM categories
        ORDER BY created_at DESC
      `,
    );

    res.status(200).json({
      categories: result.rows,
    });
  } catch (error) {
    console.error(
      "Get categories error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to fetch categories.",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      date,
    } = req.body;

    const normalizedName = name?.trim();

    if (!normalizedName) {
      return res.status(400).json({
        message: "Category name is required.",
      });
    }

    const existingCategory = await pool.query(
      `
        SELECT id
        FROM categories
        WHERE LOWER(name) = LOWER($1)
      `,
      [normalizedName],
    );

    if (existingCategory.rows.length > 0) {
      return res.status(409).json({
        message:
          "A category with this name already exists.",
      });
    }

    const result = await pool.query(
      `
        INSERT INTO categories (
          name,
          description,
          status,
          date
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
          id,
          name,
          description,
          status,
          date,
          created_at
      `,
      [
        normalizedName,
        description?.trim() || null,
        status || "Active",
        date || new Date().toISOString().split("T")[0],
      ],
    );

    res.status(201).json({
      category: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Create category error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to create category.",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      status,
      date,
    } = req.body;

    const normalizedName = name?.trim();

    if (!normalizedName) {
      return res.status(400).json({
        message: "Category name is required.",
      });
    }

    const existingCategory = await pool.query(
      `
        SELECT id
        FROM categories
        WHERE LOWER(name) = LOWER($1)
          AND id != $2
      `,
      [normalizedName, id],
    );

    if (existingCategory.rows.length > 0) {
      return res.status(409).json({
        message:
          "A category with this name already exists.",
      });
    }

    const result = await pool.query(
      `
        UPDATE categories
        SET
          name = $1,
          description = $2,
          status = $3,
          date = $4
        WHERE id = $5
        RETURNING
          id,
          name,
          description,
          status,
          date,
          created_at
      `,
      [
        normalizedName,
        description?.trim() || null,
        status || "Active",
        date,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    res.status(200).json({
      category: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Update category error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to update category.",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM categories
        WHERE id = $1
        RETURNING id
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    res.status(200).json({
      message:
        "Category deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete category error:",
      error.message,
    );

    res.status(500).json({
      message: "Failed to delete category.",
    });
  }
};