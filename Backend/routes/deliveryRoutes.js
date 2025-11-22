import express from "express";
const router = express.Router();
import {
  createDelivery,
  addLine,
  updateStatus,
  validateDelivery
} from "../controllers/deliveryController.js";

router.post("/", createDelivery);
router.post("/:id/lines", addLine);
router.put("/:id/status", updateStatus);
router.post("/:id/validate", validateDelivery);

export default router;
