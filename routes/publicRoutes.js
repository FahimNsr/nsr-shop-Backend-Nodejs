const { Router } = require("express");
const router = new Router();

// Controllers
const { home } = require("../controllers/homeController");
const { register, login } = require("../controllers/authController");
const { products } = require("../controllers/productController");

//@desc   GET HomePage
//@route  GET /
router.get("/", home);

//@desc   POST a User to DB
//@route  POST user/register
router.post("/register", register);

//@desc   Check Identity for user
//@route  POST user/login
router.post("/login", login);

//@desc   GET all Products from DB
//@route  GET /products
router.get("/products", products);

module.exports = router;
