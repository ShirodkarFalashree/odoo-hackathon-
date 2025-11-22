import express from "express";
const router = express.Router();
import { getMoves } from "../controllers/moveController.js";

router.get("/", getMoves);

export default router;
