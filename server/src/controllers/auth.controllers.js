const Roles = require("../models/Roles");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

const singUp = async (req, res) => {
  const { email, password, roles } = req.body;

  try {
    const newUser = new User({
      email,
      password: await User.encryptPassword(password),
    });
    console.log(newUser);

    if (roles) {
      const foundRoles = await Roles.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role.id);
    } else {
      const role = await Roles.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jwt.sign({ id: savedUser._id }, config.secretKey, {
      expiresIn: 3600,
    });

    res.status(200).json("User created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const singIn = async (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario y popular el campo roles con el nombre de los roles
  const userFound = await User.findOne({ email }).populate("roles");
  if (!userFound)
    return res.status(400).json({ message: "Invalid email or password" });

  // Verificar si la contraseña es válida
  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );
  if (!matchPassword)
    return res
      .status(400)
      .json({ token: null, message: "Invalid email or password" });

  // Verificar roles del usuario
  const roles = userFound.roles.map((role) => role.name); // Obtener los nombres de los roles

  // Crear el token
  const token = jwt.sign({ id: userFound._id, roles }, config.secretKey, {
    expiresIn: 3600,
  });

  // Responder con el token y los roles
  res.status(200).json({
    token,
    // Envía un arreglo de roles como ["user", "moderator"], etc.
  });
};

module.exports = {
  singUp,
  singIn,
};
