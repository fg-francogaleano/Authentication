/*
  verifica si tiene, un "token" o que tipo de rol posee(rol usuario, moderador, admin)
 */
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");
const Roles = require("../models/Roles");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(token);

    if (!token) return res.status(403).json({ message: "No Token provided" });

    const decoded = jwt.verify(token, config.secretKey);
    console.log(decoded, "hola");
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not fount" });

    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (const element of roles) {
    if (element.name === "moderator") {
      next();
      return;
    }
    return res.status(403).json({ message: "Require Moderator role" });
  }
  console.log(roles, "es en roles");

  next();
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (const element of roles) {
    if (element.name === "admin") {
      next();
      return;
    }
    return res.status(403).json({ message: "Require Admin role" });
  }
  console.log(roles, "es en roles");

  next();
};

module.exports = { verifyToken, isModerator, isAdmin };
