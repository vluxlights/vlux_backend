import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================

    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    subName: { type: String, default: "", trim: true },

    // ✅ NEW CATEGORY FIELD (ADDED)
    category: {
      type: String,
      default: "",
      trim: true,
      index: true
    },

    type: { type: String, default: "", trim: true }, // Indoor / Outdoor / Both

    modelNumber: { type: String, default: "", trim: true },
    warranty: { type: String, default: "", trim: true },

    color: {
      type: String,
      default: "",
      trim: true
    },

    dateAdded: {
      type: Date,
      default: Date.now
    },

    // ================= PRICE =================

    price: {
      type: Number,
      required: true
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    // ================= TECH SPECS =================

    powerConsumption: { type: String, default: "" },
    housingSize: { type: String, default: "" },

    powerFactor: { type: String, default: null },
    thd: { type: String, default: null },

    lumens: { type: String, default: null },

    colorTemperature: { type: String, default: "" },

    surgeProtection: { type: String, default: "" },
    lineFrequency: { type: String, default: "" },

    ratedVoltage: { type: String, default: "" },
    operatingVoltage: { type: String, default: "" },

    cri: { type: String, default: null },

    features: { type: String, default: "" },
    housingMaterial: { type: String, default: "" },
    baseType: { type: String, default: "" },

    averageLife: { type: String, default: "" },

    // ================= IMAGES =================

    images: [
      {
        url: {
          type: String,
          required: true
        },
        publicId: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);