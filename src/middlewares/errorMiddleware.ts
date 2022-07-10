import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appErros.js";

function handleErrors (error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if (error instanceof AppError) {
        return res.status(error.status).send(error.message);
    }

    return res.status(500).send("Internal Server Error");
};

export default handleErrors;