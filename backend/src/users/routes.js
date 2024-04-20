import { Router } from "express";

const router = Router();

// Controller Imports
import { 
    getUser, getAllUsers,
     createUser, updateUser,
      deleteUser 
    } from "./controllers/UserController.js";


// router.get("/:userId", getUser);

router.get("/", getAllUsers);

router.post("/", createUser)

router.patch("/", updateUser);

router.delete("/", deleteUser);

export default router;