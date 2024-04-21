import { Router } from "express";

const router = Router();

// Controller Imports
import { 
    getTrip, 
    getAllTrips,
    createTrip, 
    updateTrip,
    deleteTrip 
  } from "./controllers/TripController.js";

import { 
    getAllTripExperiences,
    createTripExperience, 
    deleteTripExperience 
  } from "./controllers/TripExperienceController.js";


// router.get("/:tripId", getTrip);

router.get("/", getAllTrips);

router.get("/:tripId", getAllTripExperiences);

router.post("/", createTrip)

router.post("/:tripId", createTripExperience);

router.patch("/", updateTrip);

router.delete("/", deleteTrip);

router.delete("/:tripId", deleteTripExperience);

export default router;