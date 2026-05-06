import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

/* =========================
   PLACE ORDER
========================= */
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, subtotal, gst, delivery, total } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const order = await Order.create({
      userId,
      items,
      address,
      subtotal,
      gst,
      delivery,
      total,
    });

    // clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET USER ORDERS
========================= */
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};