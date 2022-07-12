import { NextFunction, Request, Response } from "express";
import { findById } from "../repositories/cardRepository.js";
import AppError from "../utils/appErros.js";


export async function validateCardRegistration(req: Request, res: Response, next: NextFunction){
    const cardId = Number(req.params.CardId);
    const card = await findById(cardId);

    if (!card) {
        throw new AppError(404, "Card not found");
    }

    res.locals.card = card;
    next();
}