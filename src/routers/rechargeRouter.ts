import { Router } from "express";
import { recharge } from "../controllers/rechargeController.js";
import { validateCardRegistration } from "../middlewares/cardMiddleware.js";
import { validateCompanyRegistration } from "../middlewares/companyMiddleware.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post(
    "/recharges",
    validateSchema(rechargeSchema),
    validateCompanyRegistration,
    validateCardRegistration,
    recharge
);

export default rechargeRouter;