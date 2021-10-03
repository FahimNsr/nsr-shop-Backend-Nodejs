const { Router } = require("express");
const router = new Router();

// Controllers
const { products } = require("../../controllers/productController");

//@desc   GET all Products from DB
//@route  GET /products
//access  Public
router.get("/products", products);

module.exports = router;
