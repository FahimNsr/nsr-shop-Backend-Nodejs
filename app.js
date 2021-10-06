// Load Config
require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");

const { connectDB } = require("./config/db");
const { apiErrorHandler } = require("./middlewares/apiErrorHandler");

// Dashboard Routes
const homeRoutes = require("./routes/public/homeRoutes")
const authRoutes = require("./routes/public/authRoutes")
const productRoutes = require("./routes/public/productRoutes")
const cartRoutes = require("./routes/public/cartRoutes")

// Home Routes
const adminRoutesProduct = require("./routes/private/productRoutes")

// Connect to DataBase
connectDB();

const app = express();

app.use(morgan("dev"));

// Body-Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// SET Public Routes
app.use("/", homeRoutes);
app.use("/user", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// SET Private Routes
app.use("/dash", adminRoutesProduct);

app.use(apiErrorHandler);

app.listen(process.env.PORT || 8000, () => {
    const now = new Date();
    console.log(`Time: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
    console.log(`Server running on port: ${process.env.PORT}`);
});
