const { Router } = require("express");
const router = new Router();

// Controllers
const { home } = require("../../controllers/homeController");

//@desc   GET HomePage
//@route  GET /
//access  Public
router.get("/", home);


module.exports = router;
