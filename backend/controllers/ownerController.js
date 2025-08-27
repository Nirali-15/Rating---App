const { Store, Rating, User } = require("../models");

// Dashboard for store owner
exports.getDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Rating,
          as: "ratings",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const ratings = store.ratings || [];
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;

    // Collect users who rated
    const users = ratings.map((r) => ({
      id: r.user.id,
      name: r.user.name,
      email: r.user.email,
      score: r.score,
    }));

    res.json({
      storeName: store.name,
      avgRating,
      users,
    });
  } catch (err) {
    console.error(" Owner dashboard error:", err);
    res.status(500).json({ message: err.message });
  }
};
