import { Request, Response } from "express";
import { Business } from "../repositories/businessRepository.js";
import { Card } from "../repositories/cardRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import * as purchaseService from "../services/purchaseService.js";

export async function purchase(req: Request, res: Response){
    const card: Card = res.locals.card;
    const employee: Employee = res.locals.employee;
    const business: Business = res.locals.business;
    const amount = +req.body.amount;
    const password = req.body.password;

    await purchaseService.purchase(card, employee, business, amount, password);
    console.log("Purchase registered successfully.");
    res.sendStatus(200);
}