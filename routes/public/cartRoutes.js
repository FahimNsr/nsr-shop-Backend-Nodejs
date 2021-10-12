const { Router } = require("express");
const router = new Router();

// Controllers
const { cart, addToCart, removeFromCart } = require("../../controllers/cartController");

// Middlewares
const verifyToken = require("../../middlewares/verifyToken");

//@desc   GET User Cart from DB
//@route  GET /cart
//access  Private : User must login & be admin
router.get("/", verifyToken, cart);

//@desc   Add a Product to User Cart
//@route  POST /cart/addItem
//access  Private : User must login
router.post("/addItem", verifyToken, addToCart);

//@desc   Remove a Product from User Cart
//@route  Put /cart/removeItem
//access  Private : User must login
router.put("/removeItem", verifyToken, removeFromCart);

module.exports = router;
