import express from "express";
const router = express.Router();
import { getProducts, createProduct } from "../controllers/productController.js";

router.get("/", getProducts);
router.post("/", createProduct);

export default router;
