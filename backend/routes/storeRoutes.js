const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Get all stores (with owner + ratings)
router.get("/", storeController.getStores);

// Get single store by ID
router.get("/:id", storeController.getStoreById);

module.exports = router;
