const { User, Store, Rating } = require("../models");
const bcrypt = require("bcrypt");

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new user
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, address, password: hashedPassword, role });
    res.status(201).json({ message: "User added successfully", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const { Op } = require("sequelize");

// List users with combined store ratings if owner
exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const whereClause = {};
    if (name) whereClause.name = name;
    if (email) whereClause.email = email;
    if (address) whereClause.address = address;
    if (role) whereClause.role = role;

    // Fetch all users with their stores + ratings
    const users = await User.findAll({
      where: whereClause,
      attributes: ["id", "name", "email", "address", "role"],
      include: [
        {
          model: Store,
          as: "stores",
          attributes: ["id", "name"],
          include: [
            {
              model: Rating,
              as: "ratings",
              attributes: ["id", "score"],
            }
          ],
          required: false
        }
      ]
    });

    // Transform response
    const result = users.map(u => {
      const user = u.toJSON();

      // If not OWNER, drop stores field
      if (user.role !== "OWNER") {
        delete user.stores;
        return user;
      }

      // Aggregate ratings for all of this owner's stores
      let totalScore = 0;
      let totalCount = 0;

      user.stores.forEach(store => {
        store.ratings.forEach(r => {
          totalScore += r.score;
          totalCount++;
        });
      });

      const avgScore = totalCount > 0 ? (totalScore / totalCount).toFixed(2) : null;

      // Replace stores with combined ratings summary
      user.storeRatings = {
        totalRatings: totalCount,
        averageScore: avgScore,
      };

      delete user.stores; // don’t return stores list
      return user;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// User details (with stores + ratings)
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "address", "role"],
      include: [
        {
          model: Store,
          as: "stores",
          attributes: ["id", "name", "address"],
          include: [
            {
              model: Rating,
              as: "ratings",
              attributes: ["id", "score", "comment"]
            }
          ]
        },
        {
          model: Rating,
          as: "ratings",
          attributes: ["id", "score", "comment"]
        }
      ]
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= Store Management =================
// Add new store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    if (!name || !ownerId) return res.status(400).json({ message: "Missing required fields" });

    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json({ message: "Store added successfully", storeId: store.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List stores with filters + owner + ratings
exports.listStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const whereClause = {};
    if (name) whereClause.name = name;
    if (email) whereClause.email = email;
    if (address) whereClause.address = address;

    const stores = await Store.findAll({
      where: whereClause,
      include: [
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
        { model: Rating, as: "ratings" },
      ],
    });

    const formatted = stores.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      ownerName: s.owner?.name || "N/A",
      ratingsCount: s.ratings?.length || 0,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
