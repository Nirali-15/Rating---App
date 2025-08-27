const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

exports.authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: "Access denied: Insufficient role" });
  next();
};
