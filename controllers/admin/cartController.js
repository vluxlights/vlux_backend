import Cart from "../../models/Cart.js";

/* =========================
   ➕ ADD TO CART
========================= */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });

    // create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });

      return res.status(201).json(cart);
    }

    // check existing item
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   📥 GET CART
========================= */
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   ❌ REMOVE SINGLE ITEM
========================= */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   🔄 UPDATE QUANTITY (INC / DEC)
========================= */
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, type } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // increase
    if (type === "inc") {
      item.quantity += 1;
    }

    // decrease
    if (type === "dec") {
      item.quantity -= 1;
    }

    // remove if quantity <= 0
    cart.items = cart.items.filter((i) => i.quantity > 0);

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   🧹 CLEAR CART
========================= */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }
    );

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};