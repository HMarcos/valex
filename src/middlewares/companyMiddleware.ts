import { NextFunction, Request, Response } from "express";
import * as companyRopository from "./../repositories/companyRepository.js";
import AppError from "../utils/appErros.js";

export async function validateCompanyRegistration(req: Request, res: Response, next: NextFunction) {
    const xApiKey: string = req.headers["x-api-key"]?.toString();
    console.log(xApiKey);

    if (!xApiKey) {
        throw new AppError(422, "x-api-key invalid.");
    }

    const company = await companyRopository.findByApiKey(xApiKey);

    if (!company) {
        throw new AppError(404, "Company not found.");
    }

    res.locals.company = company;
    next();
}