import express from "express";
import {
  createWarehouse,
  getWarehouse,
  updateWarehouse
} from "../controllers/warehouseController.js";

const router = express.Router();

router.post("/", createWarehouse);   // Add this
router.get("/", getWarehouse);
router.put("/", updateWarehouse);

export default router;
