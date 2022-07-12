import joi from "joi";
import { MIN_RECHARGE } from "../utils/constants.js";

export const rechargeSchema = joi.object({
    cardId: joi.number().integer().min(1).required(),
    amount: joi.number().integer().min(MIN_RECHARGE).required()
});