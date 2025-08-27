const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

const { authenticateJWT } = require("../middlewares/authMiddleware");

// Get all ratings for checking in postman
router.get("/", ratingController.getRatings);

// Create new rating also he can update it (authenticated)
router.post("/", authenticateJWT, ratingController.createRating);

// Update rating (only user that give rating can update)
router.put("/:id", authenticateJWT, ratingController.updateRating);

module.exports = router;
