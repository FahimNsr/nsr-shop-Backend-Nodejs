const { Router } = require("express");
const router = new Router();

// Controllers
const { home } = require("../../controllers/homeController");
const { addToCart } = require("../../controllers/cartController");

//@desc   GET HomePage
//@route  GET /
//access  Public
router.get("/", home);

//@desc   POST a Product to User Cart
//@route  POST /add-to-cart
//access  Public
router.post("/add-to-cart", addToCart);

module.exports = router;
