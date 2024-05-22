import { Router } from "express";

const router = Router();

// Controller Imports
import {
  getTrip,
  getAllTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "./controllers/TripController.js";

import {
  getAllTripExperiences,
  createTripExperience,
  deleteTripExperience,
} from "./controllers/TripExperienceController.js";

router.get("/:tripId", getTrip);

router.get("/", getAllTrips);

router.get("/:tripId/experience", getAllTripExperiences);

router.post("/", createTrip);

router.post("/:tripId/experience/:expId", createTripExperience);

router.patch("/:tripId", updateTrip);

router.delete("/:tripId", deleteTrip);

router.delete("/:tripId/experience/:expId", deleteTripExperience);

export default router;
