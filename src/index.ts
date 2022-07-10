import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import handleErrors from "./middlewares/errorMiddleware.js";
import { connection } from "./database.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(handleErrors);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, async() => {
    console.log(`The server is running on port ${PORT}...`);
});