import express from "express";
import multer from "multer";
import { uploadImage } from "./experiences/controllers/ImageController.js";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.RAILWAY_VOLUME_MOUNT_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

let upload = multer({ storage: storage });

// Define upload route
router.post("/upload", upload.single("uploaded_file"), uploadImage);

// Serve uploaded files
router.get("/uploads", function (req, res, next) {
  let options = {
    root: "/uploads",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  let fileName = req.query.fileName;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

export default router;
