import { Router } from "express";
import * as cardController from "./../controllers/cardController.js";
import { validateCompanyRegistration } from "../middlewares/companyMiddleware.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import * as cardSchemas from "../schemas/cardSchemas.js";
import { validateEmployeeRegistration } from "../middlewares/employeeMiddleware.js";
import { validateCardRegistration } from "../middlewares/cardMiddleware.js";

const cardRouter = Router();
cardRouter.post("/cards",
    validateCompanyRegistration,
    validateSchema(cardSchemas.cardCreationSchema),
    validateEmployeeRegistration,
    cardController.createCard
);

cardRouter.put(
    "/cards/:cardId/activation",
    validateCardRegistration,
    validateSchema(cardSchemas.cardActivationSchema),
    validateEmployeeRegistration,
    cardController.activeCard
);

cardRouter.put(
    "/cards/:cardId/block",
    validateCardRegistration,
    validateSchema(cardSchemas.cardBlockAndUnlockSchema),
    validateEmployeeRegistration,
    cardController.blockCard
);

cardRouter.put(
    "/cards/:cardId/unlock",
    validateCardRegistration,
    validateSchema(cardSchemas.cardBlockAndUnlockSchema),
    validateEmployeeRegistration,
    cardController.unlockCard
);

cardRouter.get(
    "/cards/:cardId/operations",
    validateCardRegistration,
    cardController.getBalanceAndOperations
)

export default cardRouter;