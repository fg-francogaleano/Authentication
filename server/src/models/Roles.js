const mongoose = require("mongoose");

// const ROLES = ["user", "admin", "moderator"];

const rolesSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);
const Roles = mongoose.model("Roles", rolesSchema);

module.exports = Roles;
