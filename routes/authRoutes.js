const { Router } = require("express");

const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

const router = new Router();

router.post("/register", verifyToken, authController.register);
router.post("/login", verifyToken, authController.login);

module.exports = router;
