const fs = require("fs");

const sharp = require("sharp");
const appRoot = require("app-root-path");

const Product = require("../../models/Product");

exports.products = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    const thumbnail = req.files ? req.files.thumbnail : {};
    const fileName = `${thumbnail.name}+${Date.now()}`;
    const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;
    try {
        req.body = { ...req.body, thumbnail };
        await Product.productValidation(req.body);
        await sharp(thumbnail.data)
            .jpeg({ quality: 60 })
            .toFile(uploadPath)
            .catch((err) => console.log(err));

        const product = await Product.create({
            ...req.body,
            user: req.userId,
            thumbnail: fileName,
        });
        res.status(201).json({ product });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.editProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            res.status(404).send("There is no product with this ID");
        }

        res.status(200).json({ product });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.updateProduct = async (req, res) => {
    const thumbnail = req.files ? req.files.thumbnail : {};
    const fileName = `${thumbnail.name}+${Date.now()}`;
    const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
        res.status(404).send("There is no product with this ID");
    }
    try {
        if (thumbnail.name) {
            await Product.productValidation({ ...req.body, thumbnail });
        } else {
            await Product.productValidation({
                ...req.body,
                thumbnail: {
                    name: "placeholder",
                    size: 0,
                    mimetype: "image/jpeg",
                },
            });
        }
        if (thumbnail.name) {
            fs.unlink(`${appRoot}/public/uploads/thumbnails/${product.thumbnail}`, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    await sharp(thumbnail.data)
                        .jpeg({ quality: 60 })
                        .toFile(uploadPath)
                        .catch((err) => console.log(err));
                }
            });
        }
        const { title, price, quantity, sold, overview } = req.body;
        product.title = title;
        product.price = price;
        product.quantity = quantity;
        product.sold = sold;
        product.overview = overview;

        product.thumbnail = thumbnail.name ? fileName : product.thumbnail;

        const updatedProduct = await product.save();

        res.status(200).json({ updatedProduct });
    } catch (err) {
        console.log(err)
        next(err);
    }
};
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        fs.unlink(`${appRoot}/public/uploads/thumbnails/${product.thumbnail}`, (err) => {
            if (err) {
                res.status(400).send("somthing went wrong in delete thumbnail");
            } else {
                res.status(200).json({
                    message: "product deleted successfully",
                });
            }
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
};
