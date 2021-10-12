// Load Config
require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const { connectDB } = require("./config/db");
const { apiErrorHandler } = require("./middlewares/apiErrorHandler");

// Routes
const publicRoutes = require("./routes/publicRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")

// Connect to DataBase
connectDB();

const app = express();

app.use(morgan("dev"));
app.use(cors())

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

// SET Routes
app.use("/", publicRoutes);
app.use("/", userRoutes);
app.use("/dash", adminRoutes);


app.use(apiErrorHandler);

app.listen(process.env.PORT || 8000, () => {
    const now = new Date();
    console.log(`Time: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
    console.log(`Server running on port: ${process.env.PORT}`);
});
