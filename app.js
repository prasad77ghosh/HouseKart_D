const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const app = express();

//config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileupload());

//routes import
const productsRoutes = require("./routes/productRoute");
const usersRoutes = require("./routes/userRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", paymentRoute);

// ----------------------- Deployment ---------------------//
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});
//------------------------- Deployment ---------------------//

// middlewares for error
app.use(errorMiddleware);

module.exports = app;
