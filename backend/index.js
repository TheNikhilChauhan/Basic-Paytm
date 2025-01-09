import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
dbConnect();

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
});
