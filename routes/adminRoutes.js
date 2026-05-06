import express from "express";
import upload from "../middlewares/multer.js";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getBanner,
  updateBanner
} from "../controllers/admin/adminController.js";

const router = express.Router();

/* ================= CATEGORY ================= */
router.get("/category", getCategories);

// CREATE
router.post("/category", upload.single("image"), addCategory);

// UPDATE
router.put("/category/:id", upload.single("image"), updateCategory);

// DELETE
router.delete("/category/:id", deleteCategory);

/* ================= BANNER ================= */
router.get("/banner", getBanner);

// UPDATE BANNER
router.post("/banner", upload.single("image"), updateBanner);
export default router;