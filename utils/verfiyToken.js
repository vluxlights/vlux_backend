import jwt from "jsonwebtoken";

/* =========================
   VERIFY JWT TOKEN
========================= */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default verifyToken;