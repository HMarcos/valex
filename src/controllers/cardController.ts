import { Request, Response } from "express";
import * as cardService from "./../services/cardService.js";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { Card, TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const company: Company = res.locals.company;
    const employee: Employee = res.locals.employee;
    const cardType: TransactionTypes = req.body.cardType;

    const card = await cardService.createCard(company, employee, cardType);

    console.log('Card registered sucessfully ...');
    res.status(201).send(card);
};

export async function activeCard(req: Request, res: Response) {
    const card: Card = res.locals.card;
    const employee: Employee = res.locals.employee;

    const password: string = req.body.password;
    const securityCode: string = req.body.securityCode;

    await cardService.activeCard(card, employee, password, securityCode);
    console.log('Card activated successfully...');
    res.sendStatus(200);
};

export async function getBalanceAndOperations(req: Request, res: Response) {
    const card: Card = res.locals.card;
    const balanceAndOperations = await cardService.getBalanceAndOperations(card);
    res.status(200).send(balanceAndOperations);
};

export async function blockCard(req: Request, res: Response) {
    const card: Card = res.locals.card;
    const employee: Employee = res.locals.employee;

    const password: string = req.body.password;

    await cardService.blockCard(card, employee, password);
    console.log('Card blocked successfully...');
    res.sendStatus(200);
};

export async function unlockCard(req: Request, res: Response) {
    const card: Card = res.locals.card;
    const employee: Employee = res.locals.employee;

    const password: string = req.body.password;

    await cardService.unlockCard(card, employee, password);
    console.log('Card unlocked successfully...');
    res.sendStatus(200);
};