import mongoose from "mongoose";

const database = () => {
  const DB =
    "mongodb+srv://rohan:540640740@cluster0.husya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("database connected...");
    })
    .catch((err) => {
      console.log("database error :", err);
    });
};

export default database;
