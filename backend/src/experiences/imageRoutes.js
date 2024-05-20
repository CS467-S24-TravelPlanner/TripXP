import { Router } from "express";
import multer from "multer";
import { uploadImage } from "./controllers/ImageController.js";

const router = Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  let upload = multer({ storage: storage });
  
  router.post(
    "/imageUpload",
    upload.fields([{ name: "uploaded_file" }]),
    uploadImage
  );

  export default router;