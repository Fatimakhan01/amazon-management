import express from "express";

import {
  getStockOuts,
  createStockOut,
} from "../controllers/stockOutController.js";

const router = express.Router();

router.get("/", getStockOuts);

router.post("/", createStockOut);

export default router;