import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db.js";

const PORT = process.env.PORT || 5000;

// DB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});