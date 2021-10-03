const { Router } = require("express");
const router = new Router();

// Controllers
const { register , login} = require("../../controllers/authController");


//@desc   POST a User to DB
//@route  POST user/register
//access  Public
router.post("/register", register);

//@desc   Check Identity for user
//@route  POST user/login
//access  Public
router.post("/login", login);

module.exports = router;
