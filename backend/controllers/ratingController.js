const { Rating, User, Store } = require("../models");

// Get all ratings with user + store info
exports.getRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Store, as: "store", attributes: ["id", "name"] },
      ],
    });
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

// Create new rating
exports.createRating = async (req, res, next) => {
  try {
    const { storeId, score } = req.body;
    const userId = req.user.id; // <-- from JWT

    if (!storeId || !score) {
      return res.status(400).json({ message: "storeId and score are required" });
    }

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: "Score must be between 1 and 5" });
    }

    // Prevent duplicate ratings → instead update
    let rating = await Rating.findOne({ where: { userId, storeId } });
    if (rating) {
      rating.score = score;
      await rating.save();
      return res.json({ message: "Rating updated", rating });
    }

    rating = await Rating.create({ userId, storeId, score });
    res.status(201).json({ message: "Rating created", rating });
  } catch (err) {
    console.error("Error in createRating:", err);
    res.status(500).json({ message: "Error creating rating", error: err.message });
  }
};

// Update rating  Not require put rating works for both creating and updating
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    // Only the owner of this rating can update it
    if (rating.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this rating" });
    }

    rating.score = score;
    await rating.save();

    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: "Error updating rating", error: error.message });
  }
};

