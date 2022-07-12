import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository.js";
import { Company } from "../repositories/companyRepository.js";
import * as rechargeService from "../services/rechargeService.js"

export async function recharge(req: Request, res: Response) {
    const card: Card = res.locals.card;
    const company: Company = res.locals.company;
    const amount = +req.body.amount;
    await rechargeService.recharge(card, company, amount);

    console.log("Card recharged successfully.");
    res.sendStatus(200);
}