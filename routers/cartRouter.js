const { Router } = require("express");
const cartRouter = new Router();

// Controllers
const { getCart, addToCart, removeFromCart } = require("../../controllers/cartController");

// Middlewares

//@desc   GET User Cart from DB
//@route  GET /cart
//access  Private : User must login & be admin
cartRouter.get("/", isAuth, getCart);
const { isAuth } = require("../helpers/authenticate");

//@desc   Add a Product to User Cart
//@route  POST /cart/addItem
//access  Private : User must login
cartRouter.post("/addItem", isAuth, addToCart);

//@desc   Remove a Product from User Cart
//@route  Put /cart/removeItem
//access  Private : User must login
cartRouter.put("/removeItem", isAuth, removeFromCart);

module.exports = cartRouter;
