import { Router } from "express";
import { purchase } from "../controllers/purchaseController.js";
import { validateBusinessRegistration } from "../middlewares/businessMiddleware.js";
import { validateCardRegistration } from "../middlewares/cardMiddleware.js";
import { validateEmployeeRegistration } from "../middlewares/employeeMiddleware.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import { purchaseSchema } from "../schemas/purchaseSchema.js";

const purchaseRouter = Router();

purchaseRouter.post(
    "/purchases",
    validateSchema(purchaseSchema),
    validateCardRegistration,
    validateEmployeeRegistration,
    validateBusinessRegistration,
    purchase
);

export default purchaseRouter;