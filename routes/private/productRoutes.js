const { Router } = require("express");
const router = new Router();

// Controllers
const { products, addProduct, editProduct, updateProduct, deleteProduct } = require("../../controllers/admin/productController");

// Middlewares
const verifyAdmin = require("../../middlewares/verifyAdmin");

//@desc   GET all Products from DB
//@route  GET dash/products
//access  Private
router.get("/products", verifyAdmin, products);

//@desc   POST a Product to DB
//@route  POST dash/add-product
//access  Private
router.post("/add-product", verifyAdmin, addProduct);

//@desc   GET a Product from DB for Edit
//@route  GET dash/edit-product/:id
//access  Private
router.get("/edit-product/:id", verifyAdmin, editProduct);

//@desc   PUT edited Products to DB
//@route  PUT dash/update-product/:id
//access  Private
router.put("/update-product/:id", verifyAdmin, updateProduct);

//@desc   DELETE a Product from DB
//@route  DELETE dash/delete-product/:id
//access  Private
router.delete("/delete-product/:id", verifyAdmin, deleteProduct);

module.exports = router;
