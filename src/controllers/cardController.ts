import { Request, Response } from "express";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export function createCard(req: Request, res: Response) {
    const company: Company = res.locals.company;
    const employee: Employee = res.locals.employee;
    const cardType: TransactionTypes = req.body.cardType;
    console.log(company);
    console.log(employee);
    res.sendStatus(201);
}