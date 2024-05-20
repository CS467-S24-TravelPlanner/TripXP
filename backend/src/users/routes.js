import { Router } from "express";

const router = Router();

// Controller Imports
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/UserController.js";

router.get("/", getUser);

router.post("/", createUser);

router.patch("/", updateUser);

router.delete("/", deleteUser);

export default router;
