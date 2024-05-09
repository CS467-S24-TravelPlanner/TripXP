import { Router } from "express";

const router = Router();

// Controller Imports
import {
  getReview,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./controllers/ReviewController.js";

// router.get("/:reviewId", getReview);

router.get("/", getAllReviews);

router.post("/", createReview);

router.patch("/", updateReview);

router.delete("/", deleteReview);

export default router;
