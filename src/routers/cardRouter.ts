import { Router } from "express";
import { validateCompanyRegistration } from "../middlewares/companyMiddleware.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import { cardCreationSchema } from "../schemas/cardSchemas.js";

const cardRouter = Router();
cardRouter.post("/cards", validateCompanyRegistration, validateSchema(cardCreationSchema), (req, res) => {
    console.log(res.locals.company);
    console.log(req.body);
    console.log("Ativando cartão...");
    res.sendStatus(201);
})

export default cardRouter;