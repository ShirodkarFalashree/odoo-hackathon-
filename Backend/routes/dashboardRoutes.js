import express from "express";
const router = express.Router();
import { getOverview } from "../controllers/dashboardController.js";

router.get("/overview", getOverview);

export default router;
