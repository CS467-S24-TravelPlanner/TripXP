import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ dest: '../uploads'})

// Controller Imports
import {
  getExperience,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "./controllers/ExperienceController.js";

router.get("/:experienceId", getExperience);

router.get("/", getAllExperiences);

router.post("/", createExperience);
// router.post("/", upload.single('uploaded_file'), createExperience)

router.patch("/", updateExperience);

router.delete("/", deleteExperience);

export default router;
