const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");


// Get all users with stores + ratings
router.get("/", authenticateJWT, userController.getUsers);

// Get single user by ID
router.get("/:id", userController.getUserById);

module.exports = router;