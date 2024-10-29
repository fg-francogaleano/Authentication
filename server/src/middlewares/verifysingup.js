/**
 * Verifica si existe el email existe o si es nuevo, verifica tambien si el rol ya fue creado
 * es donde se hacen las verificaciones
 */

const { ROLES } = require("../models/Roles");

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          messege: `Role ${req.body.roles} does not existed`,
        });
      }
    }

    next();
  }
};

module.exports = { checkRolesExisted };
