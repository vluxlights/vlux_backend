import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

import { protect } from "../middlewares/authMiddleware.js"; // 🔐 protect admin routes

const router = express.Router();

// PUBLIC (frontend uses this)
router.get("/", getSettings);

// ADMIN ONLY (update settings)
router.put("/", protect, updateSettings);

export default router;