import pool from "../config/db.js";

export const getSettings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        warehouse_name,
        low_stock_threshold,
        currency,
        email_notifications,
        low_stock_notifications,
        created_at,
        updated_at
      FROM settings
      ORDER BY id
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      const insertResult = await pool.query(`
        INSERT INTO settings (
          warehouse_name,
          low_stock_threshold,
          currency,
          email_notifications,
          low_stock_notifications
        )
        VALUES (
          'Amazon Warehouse',
          10,
          'PKR',
          TRUE,
          TRUE
        )
        RETURNING
          id,
          warehouse_name,
          low_stock_threshold,
          currency,
          email_notifications,
          low_stock_notifications,
          created_at,
          updated_at
      `);

      return res.status(200).json({
        settings: insertResult.rows[0],
      });
    }

    res.status(200).json({
      settings: result.rows[0],
    });
  } catch (error) {
    console.error("Get settings error:", error.message);

    res.status(500).json({
      message: "Failed to fetch settings.",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const {
      warehouseName,
      lowStockThreshold,
      currency,
      emailNotifications,
      lowStockNotifications,
    } = req.body;

    if (!warehouseName?.trim()) {
      return res.status(400).json({
        message: "Warehouse name is required.",
      });
    }

    const threshold = Number(lowStockThreshold);

    if (!Number.isInteger(threshold) || threshold < 0) {
      return res.status(400).json({
        message: "Low stock threshold must be a valid number.",
      });
    }

    if (!currency?.trim()) {
      return res.status(400).json({
        message: "Currency is required.",
      });
    }

    const result = await pool.query(
      `
        UPDATE settings
        SET
          warehouse_name = $1,
          low_stock_threshold = $2,
          currency = $3,
          email_notifications = $4,
          low_stock_notifications = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = (
          SELECT id
          FROM settings
          ORDER BY id
          LIMIT 1
        )
        RETURNING
          id,
          warehouse_name,
          low_stock_threshold,
          currency,
          email_notifications,
          low_stock_notifications,
          created_at,
          updated_at
      `,
      [
        warehouseName.trim(),
        threshold,
        currency.trim(),
        Boolean(emailNotifications),
        Boolean(lowStockNotifications),
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Settings not found.",
      });
    }

    res.status(200).json({
      message: "Settings updated successfully.",
      settings: result.rows[0],
    });
  } catch (error) {
    console.error("Update settings error:", error.message);

    res.status(500).json({
      message: "Failed to update settings.",
    });
  }
};

export const resetSettings = async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE settings
      SET
        warehouse_name = 'Amazon Warehouse',
        low_stock_threshold = 10,
        currency = 'PKR',
        email_notifications = TRUE,
        low_stock_notifications = TRUE,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = (
        SELECT id
        FROM settings
        ORDER BY id
        LIMIT 1
      )
      RETURNING
        id,
        warehouse_name,
        low_stock_threshold,
        currency,
        email_notifications,
        low_stock_notifications,
        created_at,
        updated_at
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Settings not found.",
      });
    }

    res.status(200).json({
      message: "Settings reset successfully.",
      settings: result.rows[0],
    });
  } catch (error) {
    console.error("Reset settings error:", error.message);

    res.status(500).json({
      message: "Failed to reset settings.",
    });
  }
};