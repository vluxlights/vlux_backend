import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/admin/cartController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =========================
   ➕ ADD TO CART
========================= */
router.post("/add", protect, addToCart);

/* =========================
   📥 GET USER CART
========================= */
router.get("/", protect, getCart);

/* =========================
   ❌ REMOVE SINGLE ITEM
========================= */
router.delete("/remove/:productId", protect, removeFromCart);

/* =========================
   🔄 UPDATE QUANTITY
========================= */
router.put("/update", protect, updateCartItem);

/* =========================
   🧹 CLEAR CART
========================= */
router.delete("/clear", protect, clearCart);

export default router;