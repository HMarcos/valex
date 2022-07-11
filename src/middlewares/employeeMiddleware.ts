import { NextFunction, Request, Response } from "express";
import * as employeeRopository from "./../repositories/employeeRepository.js";
import AppError from "../utils/appErros.js";

export async function validateEmployeeRegistration(req: Request, res: Response, next: NextFunction) {
    const employeeId = +req.body.employeeId;

    const employee = await employeeRopository.findById(employeeId);

    if (!employee) {
        throw new AppError(404, "Employee not found.");
    }

    res.locals.employee = employee;
    next();
}