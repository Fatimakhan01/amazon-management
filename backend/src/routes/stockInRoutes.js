import express from "express";

import {
  getStockIns,
  createStockIn,
} from "../controllers/stockInController.js";

const router = express.Router();

router.get("/", getStockIns);
router.post("/", createStockIn);

export default router; 