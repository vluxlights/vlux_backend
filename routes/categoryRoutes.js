import express from "express";
import {
    addCategory,
    getCategories,
    deleteCategory
} from "../controllers/admin/categoryController.js";

const router = express.Router();

/* ================= CATEGORY ROUTES ================= */

// Add category
router.post("/", addCategory);

// Get all categories
router.get("/", getCategories);

// Delete category
router.delete("/:id", deleteCategory);

export default router;