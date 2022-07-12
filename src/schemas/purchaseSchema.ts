import joi from "joi";
import { PASSWORD_LENGTH } from "../utils/constants.js";

export const purchaseSchema = joi.object({
    employeeId: joi.number().integer().min(1).required(),
    cardId: joi.number().integer().min(1).required(),
    businessId: joi.number().integer().min(1).required(),
    amount: joi.number().integer().min(1).required(),
    password: joi.string().length(PASSWORD_LENGTH).required()
});