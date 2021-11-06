const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const uploadRouter = require("./routers/uploadRouter");
const orderRouter = require("./routers/orderRouter");
// const cartRouter = require("./routes/cartRouter")

// Load Config
require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected ${connect.connection.host}`);
  } catch (err) {
    console.error("MongoDB Connection FAIL");
    process.exit(1);
  }
};
connectDB();

const app = express();

app.use(morgan("dev"));
app.use(cors());

// Body-Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder
app.use(express.static(path.join(__dirname, "uploads")));

// SET Routers
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/cart", cartRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port: ${process.env.PORT} Time: ${new Date()}`);
});
