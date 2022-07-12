import { NextFunction, Request, Response } from "express";
import { findById } from "../repositories/cardRepository.js";
import AppError from "../utils/appErros.js";


export async function validateCardRegistration(req: Request, res: Response, next: NextFunction) {
    const cardId = Number(req.params.cardId);
    if (isNaN(cardId)) {
        throw new AppError(422, "cardId must be a number.");
    }
    const card = await findById(cardId);

    if (!card) {
        throw new AppError(404, "Card not found.");
    }

    res.locals.card = card;
    next();
}