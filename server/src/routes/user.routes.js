const { Router } = require("express");
const { createUser } = require("../controllers/user.controllers");
const { verifyToken, isAdmin } = require("../middlewares/authjwt");
const { checkRolesExisted } = require("../middlewares/verifySingUp");

const router = Router();

router.post("/user", verifyToken, isAdmin, createUser);

module.exports = router;
