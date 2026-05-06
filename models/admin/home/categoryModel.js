import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: String,

  status: {
    type: String,
    default: () => new Date().toLocaleString(),
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Category", categorySchema);