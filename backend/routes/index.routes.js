import express from "express";
import userRouter from "./user.routes.js";
import accountRouter from "./account.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export { userRouter, accountRouter };
