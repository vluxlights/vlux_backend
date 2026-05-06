import Order from "../../models/Order.js";
import User from "../../models/userModel.js";
import Product from "../../models/admin/product/productModel.js";

// ================= DASHBOARD =================
export const getDashboardStats = async (req, res) => {
  try {

    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // ================= RECENT ORDERS =================
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(15)
      .populate("userId", "name phoneNumber");

    // ================= TOP PRODUCTS =================
    const allOrders = await Order.find().populate("items.productId");

    const productMap = {};

    allOrders.forEach(order => {
      order.items.forEach(item => {
        if (!item.productId) return;

        const id = item.productId._id.toString();

        if (!productMap[id]) {
          productMap[id] = {
            name: item.productId.name,
            modelNumber: item.productId.modelNumber,
            price: item.price || 0,
            totalQty: 0
          };
        }

        productMap[id].totalQty += item.quantity;
      });
    });

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.totalQty - a.totalQty);

    // ================= MONTHLY SALES =================
    const monthMap = {};

    orders.forEach(o => {
      const m = new Date(o.createdAt).toLocaleString("default", { month: "short" });
      monthMap[m] = (monthMap[m] || 0) + (o.total || 0);
    });

    const monthlySales = Object.keys(monthMap).map(k => ({
      name: k,
      sales: monthMap[k]
    }));

    // ================= YEARLY SALES =================
    const yearMap = {};

    orders.forEach(o => {
      const y = new Date(o.createdAt).getFullYear();
      yearMap[y] = (yearMap[y] || 0) + (o.total || 0);
    });

    const yearlySales = Object.keys(yearMap).map(k => ({
      name: k,
      sales: yearMap[k]
    }));

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      recentOrders,
      topProducts,
      monthlySales,
      yearlySales
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};