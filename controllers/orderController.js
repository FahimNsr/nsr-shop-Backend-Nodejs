const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    console.log(req.body);
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      paymentResult: {
        id: req.body.paymentResult.id,
        status: req.body.paymentResult.status,
        update_time: req.body.paymentResult.update_time,
        email_address: req.body.paymentResult.payer.email_address,
      },
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
};

exports.userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (err) {
    console.log(err);
  }
};

exports.orderDetails = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
};

exports.ordersList = async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
};

// exports.ordersSummary = async (req, res) => {};
// exports.deleteOrder = async (req, res) => {};
// exports.deliverOrder = async (req, res) => {};
