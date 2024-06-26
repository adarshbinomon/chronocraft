const express = require("express");
const logger = require("morgan");
const bcrypt = require("bcrypt");
const multer = require("multer");
const nocache = require("nocache");
const path = require("path");
const mongoose = require("mongoose");
const { get } = require("http");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = express();

app.use(nocache());

app.set("view engine", "ejs");

//routes
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
app.use(logger("dev"));
app.use("/", userRoute);
app.use("/admin", adminRoute);

//load assets
app.use("/assets", express.static(path.resolve(__dirname, "public/assets")));
app.use(
  "/assetsbackend",
  express.static(path.resolve(__dirname, "public/assetsbackend"))
);

//error page

app.use(function (req, res) {
  res.status(404).render("user/errorPage");
});

//start server
app.listen(3000, () => {
  console.log("Server is running in port http://localhost:3000");
});

//connect database

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to mongoDB ");
});
