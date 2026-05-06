import express from "express";
import upload from "../middlewares/multer.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/admin/productControllers.js";

const router = express.Router();

/* ================= PRODUCT ROUTES ================= */

// CREATE PRODUCT (with images)
router.post("/", upload.array("images", 3), createProduct);

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT (with optional new images)
router.put("/:id", upload.array("images", 3), updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;