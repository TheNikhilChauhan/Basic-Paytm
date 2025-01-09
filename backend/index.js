import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.js";
import { userRouter } from "./routes/index.routes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
dbConnect();
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
});
