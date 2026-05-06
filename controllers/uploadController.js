import { uploadToCloudinary } from "../utils/uploadCloudiary.js";

export const uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    res.json({
      url: result.secure_url
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};