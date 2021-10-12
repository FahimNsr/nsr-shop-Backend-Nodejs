const { Router } = require("express");
const router = new Router();

// Controllers
const { addToCart, removeFromCart } = require("../../controllers/cartController");

// Middlewares
const verifyToken = require("../../middlewares/verifyToken");

//@desc   Add a Product to User Cart
//@route  POST /cart/addItem
//access  Private : User must login
router.post("/addItem", verifyToken, addToCart);

//@desc   Remove a Product from User Cart
//@route  Put /cart/removeItem
//access  Private : User must login
router.put("/removeItem", verifyToken, removeFromCart);

module.exports = router;
