import { Router } from "express";

const cardRouter = Router();
cardRouter.post("/cards", (req, res) => {
    console.log("Ativando cartão...");
})

export default cardRouter;