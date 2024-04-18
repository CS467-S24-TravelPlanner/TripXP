import { Router } from "express";

const router = Router();

// Controller Imports
import { 
    getExperience, getAllExperiences,
     createExperience, updateExperience,
      deleteExperience 
    } from "./controllers/ExperienceController.js";


router.get("/:experienceId", getExperience);

//router.patch("/", ExperienceController.updateExperience);

router.get("/", getAllExperiences);

router.post("/", createExperience)

router.patch("/:experienceId", updateExperience);

router.delete("/:experienceId", deleteExperience);

export default router;