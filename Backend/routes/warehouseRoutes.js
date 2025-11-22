import express from "express";
const router = express.Router();
import { getWarehouse, updateWarehouse } from "../controllers/warehouseController.js";

router.get("/", getWarehouse);
router.put("/", updateWarehouse);

export default router;
