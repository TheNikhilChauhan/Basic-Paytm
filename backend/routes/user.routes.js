import express from "express";
import {
  registerUser,
  searchUsers,
  signinUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", registerUser);
router.get("/signin", signinUser);
router.put("/", authMiddleware, updateUser);
router.get("/bulk", searchUsers);

export default router;
