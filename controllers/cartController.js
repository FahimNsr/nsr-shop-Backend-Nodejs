const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res, next) => {
    const userId = req.body.userId;
    try {
        // find product
        let product = await Product.findOne({ _id: req.params.id });
        const { quantity } = req.body;
        const { id, name, price } = product;

        if (quantity > product.quantity - product.sold) {
            res.status(404).send("there is no more in stock ");
        } else if (product.quantity - product.sold < 1) {
            res.status(404).send("This product does not in stock ");
        } else {
            let cart = await Cart.findOne({ userId });
            //cart exists for user
            if (cart) {
                let itemIndex = cart.products.findIndex((p) => p.productId == product._id);

                if (itemIndex > -1) {
                    //product exists in the cart, update the quantity
                    let productItem = cart.products[itemIndex];
                    productItem.quantity = quantity;
                    cart.products[itemIndex] = productItem;
                } else {
                    //product does not exists in cart, add new item
                    cart.products.push({ productId: id, quantity, name, price });
                }
                cart = await cart.save();
                return res.status(201).send(cart);
            } else {
                //no cart for user, create new cart
                const newCart = await Cart.create({
                    userId,
                    products: [{ productId: id, quantity, name, price }],
                });

                return res.status(201).send(newCart);
            }
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.removeFromCart = async (req, res, next) => {
    const userId = req.body.userId;

    try {
        let cart = await Cart.findOne({ userId });
        // find index of product in cart
        let itemIndex = cart.products.findIndex((p) => p.productId == req.params.id);

        if (itemIndex > -1) {
            // product exists in cart
            cart.products.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json({ cart });
        } else {
            return res.status(404).send("This product does not exists in cart");
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
