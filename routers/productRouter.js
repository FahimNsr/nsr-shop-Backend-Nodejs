const { Router } = require("express");
const productRouter = new Router();

// Controllers
const {
  getProducts,
  productDetail,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

// Middlewares
const { isAuth, isSellerOrAdmin } = require("../helpers/authenticate");

//@desc   GET Products list from DB
//@route  GET api/products
productRouter.get("/", getProducts);

// @desc   GET Products'categories from DB
// @route  GET api/products/categories
productRouter.get("/categories", getCategories);

//@desc   GET Product Details from DB
//@route  GET api/products/:id
productRouter.get("/:id", productDetail);

//@desc   POST a Product to DB
//@route  POST /api/products/create
productRouter.post("/create", isAuth, isSellerOrAdmin, addProduct);

//@desc   Update a Product
//@route  PUT api/products/:id
productRouter.put("/:id", isAuth, isSellerOrAdmin, updateProduct);

//@desc   DELETE a Product from DB
//@route  DELETE api/products/:id
productRouter.delete("/:id", isAuth, isSellerOrAdmin, deleteProduct);

module.exports = productRouter;
