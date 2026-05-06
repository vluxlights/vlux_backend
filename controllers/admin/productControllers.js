import Product from "../../models/admin/product/productModel.js";
import cloudinary from "../../config/cloudinary.js";
import { uploadToCloudinary } from "../../utils/uploadCloudiary.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      subName,
      type,
      modelNumber,
      warranty,
      color,
      price,
      discountPercentage,
      powerConsumption,
      housingSize,
      powerFactor,
      thd,
      lumens,
      colorTemperature,
      surgeProtection,
      lineFrequency,
      ratedVoltage,
      operatingVoltage,
      cri,
      features,
      housingMaterial,
      baseType,
      averageLife
    } = req.body;

    // ✅ validate images
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Please upload exactly 3 images"
      });
    }

    // ✅ upload images to cloudinary
    const images = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer);

        return {
          url: result.secure_url,
          publicId: result.public_id
        };
      })
    );

    // ✅ save product
    const product = new Product({
      productId,
      name,
      subName,
      type,
      modelNumber,
      warranty,
      color,
      price,
      discountPercentage,
      powerConsumption,
      housingSize,
      powerFactor,
      thd,
      lumens,
      colorTemperature,
      surgeProtection,
      lineFrequency,
      ratedVoltage,
      operatingVoltage,
      cri,
      features,
      housingMaterial,
      baseType,
      averageLife,
      images
    });

    const saved = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: saved
    });

  } catch (err) {
    console.log("CREATE PRODUCT ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ================= GET ALL PRODUCTS ================= */
export const getAllProducts = async (req, res) => {
  try {

    const {
      type,
      name,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10
    } = req.query;

    let filter = {};

    // ================= CATEGORY FILTER =================
    if (type && type !== "all") {
      filter.type = type;
    }

    // ================= SMART NAME MATCH (NEW) =================
    if (name) {
      filter.name = {
        $regex: name,
        $options: "i"
      };
    }

    // ================= PRICE FILTER =================
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      products
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // ✅ if new images uploaded → replace old ones
    if (req.files && req.files.length > 0) {

      // delete old images from cloudinary
      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId);
          }
        }
      }

      // upload new images
      const newImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await uploadToCloudinary(file.buffer);

          return {
            url: result.secure_url,
            publicId: result.public_id
          };
        })
      );

      req.body.images = newImages;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updated
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // ✅ delete images from cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.publicId) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};