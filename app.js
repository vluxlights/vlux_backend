import express from "express";
import cors from "cors";
import routes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/prodcutRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"; 
import orderRoutes from "./routes/orderRoutes.js";
import settingsRoutes from "./routes/settingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import profile from "./routes/profileRoutes.js";
import dashboardRoutes from "./routes/admindashRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ ADD THIS

// routes
app.use("/api/vlux", routes);
app.use("/api/vlux/adminhome", adminRoutes);
app.use("/api/vlux/admincategories", categoryRoutes);


// base route
app.use("/api/vlux/adminproducts", productRoutes);


// ✅ CART ROUTES (IMPORTANT)
app.use("/api/vlux/cart", cartRoutes);


// order routes
app.use("/api/vlux/order", orderRoutes);

app.use("/api/vlux/settings", settingsRoutes);

app.use("/api/vlux/upload", uploadRoutes);

app.use("/api/vlux/", profile);

app.use("/api/vlux/admin/dashboard", dashboardRoutes);;

export default app;