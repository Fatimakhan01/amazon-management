import express from "express";

import {
  getWastages,
  createWastage,
  deleteWastage,
} from "../controllers/wastageController.js";

const router = express.Router();

router.get("/", getWastages);

router.post("/", createWastage);

router.delete("/:id", deleteWastage);

export default router;