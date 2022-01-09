const fs = require("fs");
const Product = require("../models/Product");
const appRoot = require("app-root-path");

exports.getProducts = async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || "";
  const category = req.query.category || "";
  const seller = req.query.seller || "";
  const order = req.query.order || "";
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const sellerFilter = seller ? { seller } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter =
    min && max
      ? { price: { $gte: min, $lte: max } }
      : min
      ? { price: { $gte: min } }
      : max
      ? { price: { $lte: max } }
      : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : { _id: -1 };
  const count = await Product.count({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  const all = await Product.find({}).populate("seller", "seller.name seller.logo").sort(sortOrder);
  const products = await Product.find({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate("seller", "seller.name seller.logo")
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ all, products, page, pages: Math.ceil(count / pageSize), count });
};

exports.productDetail = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "seller",
    "seller.name seller.logo seller.rating seller.numReviews"
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.seller = req.user._id;
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  } catch (err) {
    console.log(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.seller.toString() === req.user._id) {
      console.log(req.body.imageName);
      if (req.body.imageName) {
        fs.unlink(`${appRoot}/uploads/${product.imageName}`, (err) => {
          if (err) {
            res.status(401).send("Problem in deleting image");
            console.log(err);
          } else {
            console.log("old image deleted successfully");
          }
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      return res.status(401).send("You can update only your product!");
    }
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (product) {
    if (product.seller.toString() === req.user._id) {
      fs.unlink(`${appRoot}/uploads/${product.imageName}`, (err) => {
        if (err) {
          console.log(err);
          res.status(401).send("Problem in deleting image");
        } else {
          console.log("image deleted successfully");
        }
      });
      res.send({ message: "Product Deleted", product });
    } else {
      return res.status(401).send("You can delete only your product!");
    }
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
};
