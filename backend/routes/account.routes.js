import express from "express";
import { getBalance, transaction } from "../controllers/account.controllers.js";

const router = express.Router();

router.get("/balance", getBalance);
router.post("/transfer", transaction);

export default router;
