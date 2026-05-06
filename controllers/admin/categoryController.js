import Category from "../../models/admin/product/productcategoryModel.js";

/* ================= ADD CATEGORY ================= */
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        const exists = await Category.findOne({ name });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = new Category({ name });

        const saved = await category.save();

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            category: saved
        });

    } catch (err) {
        console.log("ADD CATEGORY ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/* ================= GET ALL CATEGORIES ================= */
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            categories
        });

    } catch (err) {
        console.log("GET CATEGORY ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/* ================= DELETE CATEGORY ================= */
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (err) {
        console.log("DELETE CATEGORY ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};