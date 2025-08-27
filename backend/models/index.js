// models/index.js
const sequelize = require("../config/db");
const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

// ================== Associations ==================

// User ↔ Store (One-to-Many)
User.hasMany(Store, {
  as: "stores",
  foreignKey: "ownerId",
  onDelete: "CASCADE",   // if user is deleted, delete their stores
});
Store.belongsTo(User, {
  as: "owner",
  foreignKey: "ownerId",
});

// User ↔ Rating (One-to-Many)
User.hasMany(Rating, {
  as: "ratings",
  foreignKey: "userId",
  onDelete: "CASCADE",   // delete ratings if user is deleted
});
Rating.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

// Store ↔ Rating (One-to-Many)
Store.hasMany(Rating, {
  as: "ratings",
  foreignKey: "storeId",
  onDelete: "CASCADE",   // delete ratings if store is deleted
});
Rating.belongsTo(Store, {
  as: "store",
  foreignKey: "storeId",
});

// ================== Export ==================
module.exports = {
  sequelize,
  User,
  Store,
  Rating,
};
