const { Router } = require("express");
const orderRouter = new Router();

// Controllers
const {
  createOrder,
  orderDetails,
  userOrders,
  ordersList,
  // ordersSummary,
  // deleteOrder,
  // deliverOrder,
} = require("../controllers/orderController");

// Middlewares
const { isAdmin, isAuth, isSellerOrAdmin } = require("../helpers/authenticate");

//@desc   Post new order to DB 
//@route  POST api/orders
orderRouter.post("/", isAuth, createOrder);

//@desc   GET User Orders List from DB 
//@route  GET api/orders/myorders
orderRouter.get("/myorders", isAuth, userOrders);

//@desc   GET Order Details from DB 
//@route  GET api/orders/myorders
orderRouter.get("/:id", isAuth, orderDetails);


//@desc   GET Orders list from DB
//@route  GET api/orders/
orderRouter.get("/", isAuth, isSellerOrAdmin, ordersList);

// orderRouter.get("/summary", isAuth, isAdmin, ordersSummary);

// orderRouter.delete("/:id", isAuth, isAdmin, deleteOrder);

// orderRouter.put("/:id/deliver", isAuth, isAdmin, deliverOrder);

module.exports = orderRouter;
