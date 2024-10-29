const { Router } = require("express");
const { singUp, singIn } = require("../controllers/auth.controllers");
const router = Router();

router.post("/signin", singIn);
router.post("/signup", singUp);

module.exports = router;
