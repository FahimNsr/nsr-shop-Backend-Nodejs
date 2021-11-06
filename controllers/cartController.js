// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// exports.getCart = async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       let cart = await Cart.create({
//         userId,
//         products: [],
//       });
//       res.status(200).json({ cart });
//     } else {
//       res.status(200).json({ cart });
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

// exports.addToCart = async (req, res, next) => {
//   try {
//     const { userId, productId, quantity } = req.body;
//     const product = await Product.findById(productId);
//     const { name, price } = product;
//     if (quantity > product.quantity - product.sold) {
//       res.status(404).send("there is no more in stock");
//     } else if (product.quantity - product.sold < 1) {
//       res.status(404).send("This product does not in stock");
//     } else {
//       let cart = await Cart.findOne({ userId });
//       //cart exists for user
//       if (cart) {
//         let itemIndex = cart.products.findIndex((p) => p.productId == productId);

//         if (itemIndex > -1) {
//           //product exists in the cart, update the quantity
//           let productItem = cart.products[itemIndex];
//           cart.totalQty = cart.totalQty - productItem.qty + quantity;
//           cart.totalPrice = cart.totalPrice - productItem.price + quantity * price;
//           productItem.qty = quantity;
//           productItem.price = quantity * price;
//           cart.products[itemIndex] = productItem;
//         } else {
//           //product does not exists in cart, add new item

//           cart.products.push({ productId, name, qty: quantity, price: price * quantity });
//           cart.totalQty += quantity;
//           cart.totalPrice += price * quantity;
//         }
//         cart = await cart.save();
//         return res.status(201).send(cart);
//       } else {
//         //no cart for user, create new cart
//         let totalQty = quantity;
//         let totalPrice = quantity * price;
//         const newCart = await Cart.create({
//           userId,
//           products: [{ productId, name, qty: quantity, price: quantity * price }],
//           totalQty,
//           totalPrice,
//         });

//         return res.status(201).send(newCart);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

// exports.removeFromCart = async (req, res, next) => {
//   const userId = req.body.userId;

//   try {
//     let cart = await Cart.findOne({ userId });
//     // find index of product in cart
//     let itemIndex = cart.products.findIndex((p) => p.productId == req.body.productId);

//     if (itemIndex > -1) {
//       // product exists in cart
//       let productItem = cart.products[itemIndex];

//       cart.totalQty = cart.totalQty - productItem.qty;
//       cart.totalPrice = cart.totalPrice - productItem.price;
//       cart.products.splice(itemIndex, 1);
//       await cart.save();
//       return res.status(200).json({ cart });
//     } else {
//       return res.status(404).send("This product does not exists in cart");
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };
