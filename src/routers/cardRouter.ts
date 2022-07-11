import { Router } from "express";
import { validateCompanyRegistration } from "../middlewares/companyMiddleware.js";

const cardRouter = Router();
cardRouter.post("/cards", validateCompanyRegistration ,(req, res) => {
    console.log(res.locals.company);
    console.log("Ativando cartão...");
    res.sendStatus(201);
})

export default cardRouter;