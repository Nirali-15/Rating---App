const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const { authenticateJWT, authorizeRole } = require("../middlewares/authMiddleware");

// Owner JWT & role protection
router.use(authenticateJWT, authorizeRole("OWNER"));

// Dashboard
router.get("/dashboard", ownerController.getDashboard);

module.exports = router;
