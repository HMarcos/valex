import { Request, Response } from "express";
import * as cardService from "./../services/cardService.js";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { Card, TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const company: Company = res.locals.company;
    const employee: Employee = res.locals.employee;
    const cardType: TransactionTypes = req.body.cardType;

    await cardService.createCard(company, employee, cardType);

    console.log('Card sucessfully registered...');
    res.sendStatus(201);
};

export async function activeCard(req: Request, res: Response){
    const card: Card = res.locals.card;
    const employee: Employee = res.locals.employee;

    await cardService.activeCard(card, employee);
    res.sendStatus(200);
}