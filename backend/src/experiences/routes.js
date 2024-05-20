import { Router } from "express";
import multer from "multer";

const router = Router();

// Controller Imports
import {
  getExperience,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "./controllers/ExperienceController.js";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post(
  "/imageUpload",
  upload.fields([{ name: "uploaded_file" }]),
  createExperience
);

router.get("/:experienceId", getExperience);

router.get("/", getAllExperiences);

router.post("/", createExperience);
// router.post("/", upload.single('uploaded_file'), createExperience)

router.patch("/", updateExperience);

router.delete("/", deleteExperience);

export default router;
