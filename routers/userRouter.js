const { Router } = require("express");
const userRouter = new Router();

// Controllers
const { login, register, userProfile, updateProfile, updateUser, usersList } = require("../controllers/userController");

// Middlewares
const { isAuth, isAdmin } = require("../helpers/authenticate");

//@desc   POST a User to DB
//@route  POST /api/users/register
userRouter.post("/register", register);

//@desc   Authentication
//@route  POST /api/users/login
userRouter.post("/login", login);

//@desc   Get user info from db
//@route  GET /api/users/:id
userRouter.get("/:id", isAuth, userProfile);

//@desc   update user profile
//@route  PUT /api/users/profile
userRouter.put("/profile", isAuth, updateProfile);

//@desc   GET Users list from DB
//@route  GET api/users
userRouter.get("/", isAuth, isAdmin, usersList);

// userRouter.put("/:id", isAuth, isAdmin, updateUser);

module.exports = userRouter;
