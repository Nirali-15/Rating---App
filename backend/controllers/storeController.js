const { Store, User, Rating } = require("../models");

// Get all stores (with owner + ratings)
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      include: [
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
        { model: Rating, as: "ratings", attributes: ["id", "score"] },
      ],
    });
    res.json(stores);
  } catch (err) {
    next(err);
  }
};

// Get a single store by ID
exports.getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
        { model: Rating, as: "ratings", attributes: ["id", "score"] },
      ],
    });

    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  } catch (err) {
    next(err);
  }
};
