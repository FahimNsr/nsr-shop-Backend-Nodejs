const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        products: [{ productId: String, name: String, qty: Number, price: Number }],
        totalQty: { type: Number , default: 0},
        totalPrice: { type: Number , default: 0},
        active: { type: Boolean, default: true },
        // modifiedOn: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
