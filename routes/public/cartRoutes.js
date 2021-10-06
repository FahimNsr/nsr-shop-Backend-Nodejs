const { Router } = require("express");
const router = new Router();

// Controllers
const { addToCart, removeFromCart } = require("../../controllers/cartController");

// Middlewares
const verifyToken = require("../../middlewares/verifyToken");

//@desc   POST a Product to User Cart
//@route  POST /cart/add/:id
//access  Private : User must login
router.post("/add/:id", verifyToken, addToCart);

//@desc   Remove a Product from User Cart
//@route  POST /cart/remove/:id
//access  Private : User must login
router.put("/remove/:id", verifyToken, removeFromCart);

module.exports = router;
