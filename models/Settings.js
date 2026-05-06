import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    gst: {
      type: Number,
      default: 18,
    },

    deliveryFee: {
      type: Number,
      default: 50,
    },

    // CONTACT INFO
    contactPhone: {
      type: String,
      default: "",
    },

    contactEmail: {
      type: String,
      default: "",
    },

    contactAddress: {
      type: String,
      default: "",
    },

    // BANNER IMAGE
    bannerImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);