import express from "express";
const router = express.Router();
import { getStock, updateStock } from "../controllers/stockController.js";

router.get("/", getStock);
router.put("/:id", updateStock);

export default router;
