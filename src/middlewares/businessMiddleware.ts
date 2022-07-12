import { NextFunction, Request, Response } from "express";
import * as businessRepository from "./../repositories/businessRepository.js";
import AppError from "../utils/appErros.js";

export async function validateBusinessRegistration(req: Request, res: Response, next: NextFunction) {
    const businessId = +req.body.businessId;

    const business = await businessRepository.findById(businessId);

    if (!business) {
        throw new AppError(404, "Business not found.");
    }

    res.locals.business = business;
    next();
}