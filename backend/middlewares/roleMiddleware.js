module.exports = function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied: No role found" });
    }
    if (req.user.role.toUpperCase() !== role.toUpperCase()) {
      return res.status(403).json({ message: "Access denied: Insufficient role" });
    }
    next();
  };
};
