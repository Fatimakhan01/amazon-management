import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import stockInRoutes from "./routes/stockInRoutes.js";
import stockOutRoutes from "./routes/stockOutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wastageRoutes from "./routes/wastageRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

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
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-ins", stockInRoutes);
app.use("/api/stock-outs", stockOutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wastages", wastageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);

export default app;