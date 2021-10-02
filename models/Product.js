const mongoose = require("mongoose");

const { productValidationSchema } = require("./validators/productValidator");

const ProductSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        sold: { type: Number, default: 0 },
        overview: { type: String },
        thumb: { type: String },
    },
    { timestamps: true }
);

ProductSchema.statics.productValidation = function (body) {
    return productValidationSchema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Product", ProductSchema);
