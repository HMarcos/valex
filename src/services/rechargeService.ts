import { Card } from "../repositories/cardRepository.js";
import { Company } from "../repositories/companyRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardUtils from "../utils/cardUtils.js";
import AppError from "../utils/appErros.js";


export async function recharge(card: Card, company: Company, amount: number) {
    const employee = await employeeRepository.findById(card.employeeId);

    const employeeBelongsToCompany = cardUtils.checkIfEmployeeBelongsToCompany(employee, company);
    if (!employeeBelongsToCompany) {
        throw new AppError(403, "The employee does not belong to the company.");
    }

    const cardIsActive = cardUtils.checkIfTheCardIsActive(card);
    if (!cardIsActive) {
        throw new AppError(403, "The card is not active.");
    }

    const cardIsExpired = cardUtils.checkIfTheCardIsExpired(card);
    if (cardIsExpired) {
        throw new AppError(403, "The card is expired.");
    };

    const recharge: rechargeRepository.RechargeInsertData = {
        amount,
        cardId: card.id,
    };

    await rechargeRepository.insert(recharge);
}