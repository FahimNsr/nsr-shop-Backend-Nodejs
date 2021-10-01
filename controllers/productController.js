const Product = require("../models/Product");

exports.products = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
