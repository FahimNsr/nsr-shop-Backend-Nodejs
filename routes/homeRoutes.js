const { Router } = require("express");

const homeController = require('../controllers/homeController');
const cartController = require('../controllers/cartController');

const router = new Router();

router.get("/", homeController.home);
router.post("/add-cart", cartController.addToCart);


module.exports = router;
