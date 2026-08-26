import dotenv from "dotenv";

import app from "./src/app.js";
import pool from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");

    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "Failed to connect to the database:",
      error.message,
    );

    process.exit(1);
  }
};

startServer();