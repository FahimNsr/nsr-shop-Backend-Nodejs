const { Router } = require("express");

const homeController = require('../controllers/homeController');

const router = new Router();

router.get("/", homeController.home);


module.exports = router;
