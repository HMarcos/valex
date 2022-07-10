import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import { connection } from "./database.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    console.log(`The server is running on port ${PORT}...`);
});