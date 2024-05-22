import { Router } from "express";

const router = Router();

// Controller Imports
import {
  getUser,
  updateUser,
  deleteUser,
} from "./controllers/UserController.js";

router.get("/", getUser);

router.patch("/", updateUser);

router.delete("/", deleteUser);

export default router;
