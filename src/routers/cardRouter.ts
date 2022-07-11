import { Router } from "express";
import * as cardController from "./../controllers/cardController.js";
import { validateCompanyRegistration } from "../middlewares/companyMiddleware.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import { cardCreationSchema } from "../schemas/cardSchemas.js";
import { validateEmployeeRegistration } from "../middlewares/employeeMiddleware.js";

const cardRouter = Router();
cardRouter.post("/cards",
    validateCompanyRegistration,
    validateSchema(cardCreationSchema),
    validateEmployeeRegistration,
    cardController.createCard
);

export default cardRouter;