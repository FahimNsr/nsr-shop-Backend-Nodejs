const { Router } = require("express");

const productController = require("../../controllers/admin/productController");
const verifyAdmin = require("../../middlewares/verifyAdmin")

const router = new Router();

router.get("/products", verifyAdmin, productController.products);

router.post("/add-product", verifyAdmin, productController.addProduct);

router.get("/edit-product/:id", verifyAdmin, productController.editProduct);

router.put("/update-product/:id", verifyAdmin, productController.updateProduct);

router.delete("/delete-product/:id", verifyAdmin, productController.deleteProduct);

module.exports = router;
