import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import AppError from "../utils/appErros.js";

function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const schemaValidation = schema.validate(body, { abortEarly: false });
        if (schemaValidation.error) {
            const validationErrors = schemaValidation.error.details.map( detail => detail.message);
            const validationErrorsFormated = validationErrors.join('\n');
            throw new AppError(422, validationErrorsFormated);
        }

        next();
    }
}

export default validateSchema;