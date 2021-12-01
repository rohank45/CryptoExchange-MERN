//dotenv connection
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database connection
import database from "./config/database";
database.call();

//cors policy issue
import cors from "cors";
app.use(cors());

//cookie parser
import cookieParser from "cookie-parser";
app.use(cookieParser());

//fileupload
import fileUpload from "express-fileupload";
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

//register route
import registerRoute from "./routes/registerRoute";
app.use("/", registerRoute);

//login route
import loginRoute from "./routes/loginRoute";
app.use("/", loginRoute);

//logout route
import logoutRoute from "./routes/logoutRoute";
app.use("/", logoutRoute);

//profile route
import profileRoute from "./routes/profileRoute";
app.use("/", profileRoute);

//edit profile route
import editProfileRoute from "./routes/editProfileRoute";
app.use("/", editProfileRoute);

//delete route
import deleteRoute from "./routes/deleteRoute";
app.use("/", deleteRoute);

//forgot pass sending link
import forgotPassRoute from "./routes/forgotPassRoute";
app.use("/", forgotPassRoute);

//reset password
import resetPassRoute from "./routes/resetPassRoute";
app.use("/", resetPassRoute);

//change password
import changePassRoute from "./routes/changePassRoute";
app.use("/", changePassRoute);

//listing app on PORT
app.listen(process.env.PORT, () => {
  console.log("server started...");
});
