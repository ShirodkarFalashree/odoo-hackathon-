import express from "express";
const router = express.Router();
import {
  createReceipt,
  addLine,
  updateStatus,
  validateReceipt
} from "../controllers/receiptController.js";

router.post("/", createReceipt);
router.post("/:id/lines", addLine);
router.put("/:id/status", updateStatus);
router.post("/:id/validate", validateReceipt);

export default router;
