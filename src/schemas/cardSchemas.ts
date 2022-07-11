import Joi from "joi";
import { cardTypes } from "../utils/cardTypes.js";

export const cardCreationSchema = Joi.object({
    employeeId: Joi.number().integer().min(1).required(),
    cardType: Joi.string().valid(...cardTypes).required(),
});