import express from "express";
import { getBalance, transaction } from "../controllers/account.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transaction);

export default router;
