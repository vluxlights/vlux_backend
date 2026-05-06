import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],

    address: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    subtotal: Number,
    gst: Number,
    delivery: Number,
    total: Number,

    status: {
      type: String,
      default: "placed", // placed, shipped, delivered
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);