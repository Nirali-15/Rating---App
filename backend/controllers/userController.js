const { User, Store, Rating } = require("../models");


// Get all stores (for normal user role)
exports.getUsers = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      attributes: ["id", "name", "address"],   // fetch only what’s needed
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: ["id", "score", "userId"]
        },
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"]  // optional → show store owner info
        }
      ],
    });

    // ✅ Transform each store’s data
    const result = stores.map(store => {
  const ratings = store.ratings || [];

  // overall rating
  const overall =
    ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length
      : null;

  // current logged-in user’s rating
  const userRatingObj = ratings.find(r => r.userId === req.user.id);

  return {
    id: store.id,
    name: store.name,
    address: store.address,
    overallRating: overall,
    userRating: userRatingObj ? userRatingObj.score : null,
    userRatingId: userRatingObj ? userRatingObj.id : null,
    owner: store.owner
      ? {
          id: store.owner.id,
          name: store.owner.name,
          email: store.owner.email,
        }
      : null,
  };
});

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Get single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Store, as: "stores", attributes: ["id", "name", "email"] },
        { model: Rating, as: "ratings", attributes: ["id", "score"] },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};


