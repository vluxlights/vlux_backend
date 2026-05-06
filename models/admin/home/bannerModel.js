import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  image: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Banner", bannerSchema);