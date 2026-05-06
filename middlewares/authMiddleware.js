import verifyToken from "../utils/verfiyToken.js";

export const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    token = token.split(" ")[1]; // remove "Bearer"

    const decoded = verifyToken(token);

    req.user = decoded; // attach user info

    next(); // go to next function (route)

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};