import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Amazon Warehouse Management API is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

export default app;