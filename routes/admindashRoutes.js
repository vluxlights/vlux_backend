import express from "express";
import { getDashboardStats } from "../controllers/admin/admindashboard.js";

const router = express.Router();

// ================= DASHBOARD API =================
router.get("/", getDashboardStats);

export default router;