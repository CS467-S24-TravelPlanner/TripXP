import { Router } from "express";

const router = Router();

// Controller Imports
import { 
    getTrip, getAllTrips,
     createTrip, updateTrip,
      deleteTrip 
    } from "./controllers/TripController.js";


// router.get("/:tripId", getTrip);

router.get("/", getAllTrips);

router.post("/", createTrip)

router.patch("/", updateTrip);

router.delete("/", deleteTrip);

export default router;