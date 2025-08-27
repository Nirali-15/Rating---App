const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateJWT, authorizeRole } = require("../middlewares/authMiddleware");

// Protect all admin routes
router.use(authenticateJWT, authorizeRole("ADMIN"));

// Dashboard
router.get("/dashboard", adminController.getDashboard);

// Users
router.post("/users", adminController.addUser);
router.get("/users", adminController.listUsers);
router.get("/users/:userId", adminController.getUserDetails);

// Stores
router.post("/stores", adminController.addStore);
router.get("/stores", adminController.listStores);

module.exports = router;
