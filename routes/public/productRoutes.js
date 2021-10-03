const { Router } = require("express");

const productController = require('../../controllers/productController');

const router = new Router();

router.get("/products", productController.products);


module.exports = router;
