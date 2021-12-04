//dotenv connection
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection
const database = require("./config/database");
database.call();

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

//passport initialization
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

//passport cookie session
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [process.env.PASSPORT_SECRET_KEY],
  })
);

//register route
const registerRoute = require("./routes/registerRoute");
app.use("/", registerRoute);

//login route
const loginRoute = require("./routes/loginRoute");
app.use("/", loginRoute);

//logout route
const logoutRoute = require("./routes/logoutRoute");
app.use("/", logoutRoute);

//profile route
const profileRoute = require("./routes/profileRoute");
app.use("/", profileRoute);

//edit profile route
const editProfileRoute = require("./routes/editProfileRoute");
app.use("/", editProfileRoute);

//delete route
const deleteRoute = require("./routes/deleteRoute");
app.use("/", deleteRoute);

//forgot pass sending link
const forgotPassRoute = require("./routes/forgotPassRoute");
app.use("/", forgotPassRoute);

//reset password
const resetPassRoute = require("./routes/resetPassRoute");
app.use("/", resetPassRoute);

//change password
const changePassRoute = require("./routes/changePassRoute");
app.use("/", changePassRoute);

//google oauth login
const userLogin = require("./routes/googleOauth/userLogin");
app.use("/", userLogin);

//google oauth profile
const userProfile = require("./routes/googleOauth/userProfile");
app.use("/", userProfile);

//google oauth logout
const userLogout = require("./routes/googleOauth/userLogout");
app.use("/", userLogout);

//listing app on PORT
app.listen(process.env.PORT, () => {
  console.log("server started...");
});
