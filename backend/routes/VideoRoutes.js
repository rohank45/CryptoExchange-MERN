const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "../CryptoWebApp/cryptoapp/src/Uploads/Videos",
  filename: (req, file, cb) => {
    cb(null, "VIDEO  -" + Date.now() + path.extname(file.originalname));
    console.log(file);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".mp4") {
      return cb(res.status(400).end("only .mp4 files are allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("video");

router.post("/video", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send("error" + err);
    } else {
      res.send(console.log("uploaded"));
    }
  });
});

module.exports = router;
