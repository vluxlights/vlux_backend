import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
    },

    name: {
      type: String,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    pincode: {
      type: String,
    },

    altPhone: {
      type: String,
    },

    landmark: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);