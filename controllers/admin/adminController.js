import Category from "../../models/admin/home/categoryModel.js";
import Banner from "../../models/admin/home/bannerModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY ================= */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

/* ================= GET CATEGORY ================= */
export const getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ updatedAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= ADD CATEGORY ================= */
export const addCategory = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "vlux/category");
      imageUrl = result.secure_url;
    }

    const newCat = await Category.create({
      category: req.body.category,
      image: imageUrl,
      status: new Date().toLocaleString(),
      updatedAt: new Date(),
    });

    res.json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= UPDATE CATEGORY ================= */
export const updateCategory = async (req, res) => {
  try {
    let imageUrl;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "vlux/category");
      imageUrl = result.secure_url;
    }

    const updateData = {
      category: req.body.category,
      updatedAt: new Date(),
      status: new Date().toLocaleString(),
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= DELETE CATEGORY ================= */
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= BANNER ================= */
export const getBanner = async (req, res) => {
  const data = await Banner.findOne();
  res.json(data);
};

export const updateBanner = async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded"
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "vlux/banner"
    );

    let banner = await Banner.findOne();

    if (!banner) {
      banner = await Banner.create({
        image: result.secure_url,
        updatedAt: new Date(),
      });
    } else {
      banner.image = result.secure_url;
      banner.updatedAt = new Date();
      await banner.save();
    }

    res.json(banner);

  } catch (err) {
    console.log("BANNER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};