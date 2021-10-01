const path = require("path");

const dotEnv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

const { DataBase } = require("./utils/database");
const { apiErrorHandler } = require("./utils/apiErrorHandler");
// Load Config
dotEnv.config({ path: "./config.env" });

// Connect DataBase
DataBase();

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

// Home Routes
app.use("/", require("./routes/homeRoutes"));
app.use("/", require("./routes/authRoutes"));

// Admin Routes
app.use("/dash", require("./routes/admin/productRoute"));

app.use(apiErrorHandler);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
