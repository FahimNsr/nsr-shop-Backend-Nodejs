const mongoose = require("mongoose");

const { userValidationSchema } = require("./validators/userValidator");

const productSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        sold: { type: Number, default: 0 },
        overview: { type: String },
        thumb: { type: String },
    },
    { timestamps: true }
);

productSchema.statics.productValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Product", productSchema);
