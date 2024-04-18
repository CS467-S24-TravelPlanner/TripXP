import { Router } from "express";

const router = Router();

// Controller Imports
import { 
    getUser, getAllUsers,
     createUser, updateUser,
      deleteUser 
    } from "./controllers/UserController.js";


router.get("/:userId", getUser);

//router.patch("/", UserController.updateUser);

router.get("/", getAllUsers);

router.post("/", createUser)

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;