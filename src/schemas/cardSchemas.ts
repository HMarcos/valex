import Joi from "joi";
import { cardTypes } from "../utils/cardTypes.js";
import { PASSWORD_FORMART, PASSWORD_LENGTH, SECURITY_CODE_LENGTH } from "../utils/constants.js";

export const cardCreationSchema = Joi.object({
    employeeId: Joi.number().integer().min(1).required(),
    cardType: Joi.string().valid(...cardTypes).required(),
});

export const cardActivationSchema = Joi.object({
    employeeId: Joi.number().integer().min(1).required(),
    securityCode: Joi.string().length(SECURITY_CODE_LENGTH).required(),
    password: Joi.string().length(PASSWORD_LENGTH).pattern(new RegExp(PASSWORD_FORMART)).required(),
});

export const cardBlockAndUnlockSchema = Joi.object({
    employeeId: Joi.number().integer().min(1).required(),
    password: Joi.string().length(PASSWORD_LENGTH).pattern(new RegExp(PASSWORD_FORMART)).required(),
});