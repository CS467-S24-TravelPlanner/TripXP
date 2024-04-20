import { Router } from "express";

const router = Router();

// Controller Imports
import { 
    getExperience, getAllExperiences,
     createExperience, updateExperience,
      deleteExperience 
    } from "./controllers/ExperienceController.js";


// router.get("/:experienceId", getExperience);

router.get("/", getAllExperiences);

router.post("/", createExperience)

router.patch("/", updateExperience);

router.delete("/", deleteExperience);

export default router;