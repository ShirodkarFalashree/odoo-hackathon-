import express from "express";
const router = express.Router();
import { getLocations, createLocation } from "../controllers/locationController.js";

router.get("/", getLocations);
router.post("/", createLocation);

export default router;
