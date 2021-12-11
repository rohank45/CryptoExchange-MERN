//dotenv connection
require("dotenv").config();

//express setup
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
const database = require("./config/database");
database.call();

//morgan middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

//cors policy issue
const cors = require("cors");
app.use(cors());

//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//fileupload
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

//cloudinary setup
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRETE,
});

//register
const registerRoute = require("./routes/registerRoute");
app.use("/", registerRoute);

//login
const loginRoute = require("./routes/loginRoute");
app.use("/", loginRoute);

//logout
const logoutRoute = require("./routes/logoutRoute");
app.use("/", logoutRoute);

//get profile
const profileRoute = require("./routes/profileRoute");
app.use("/", profileRoute);

//edit profile
const editProfileRoute = require("./routes/editProfileRoute");
app.use("/", editProfileRoute);

//delete user
const deleteRoute = require("./routes/deleteRoute");
app.use("/", deleteRoute);

//forgot pass sending link
const forgotPassRoute = require("./routes/forgotPassRoute");
app.use("/", forgotPassRoute);

//reset password before login
const resetPassRoute = require("./routes/resetPassRoute");
app.use("/", resetPassRoute);

//change password after login
const changePassRoute = require("./routes/changePassRoute");
app.use("/", changePassRoute);

//payment using razorpay key
const razorpayPayment = require("./routes/razorpayPayment");
app.use("/", razorpayPayment);

//saving only buy coins to db
const buyCoinRoute = require("./routes/portfolioRoutes/buyCoinRoute");
app.use("/", buyCoinRoute);

//removing only sell coins from db
const sellCoinRoute = require("./routes/portfolioRoutes/sellCoinRoute");
app.use("/", sellCoinRoute);

//sending data of saved coins to client
const getPortfolioData = require("./routes/portfolioRoutes/getPortfolioData");
app.use("/", getPortfolioData);

//add coin to watchlist in db
const addToWatchlist = require("./routes/watchlist/addToWatchlist");
app.use("/", addToWatchlist);

//remove coin to watchlist in db
const removeFromWatchlist = require("./routes/watchlist/removeFromWatchlist");
app.use("/", removeFromWatchlist);

//sending data of coin saved in watchlist in db
const getWatchlistData = require("./routes/watchlist/getWatchlistData");
app.use("/", getWatchlistData);

//remove all coin to watchlist in db
const removeAllWatchlist = require("./routes/watchlist/removeAllWatchlist");
app.use("/", removeAllWatchlist);

//listing app on PORT
app.listen(process.env.PORT, () => {
  console.log("server started...");
});
