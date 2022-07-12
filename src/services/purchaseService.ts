import { Card } from "../repositories/cardRepository";
import { Employee } from "../repositories/employeeRepository";
import * as businessRepository from "../repositories/businessRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import AppError from "../utils/appErros.js";
import { getBalanceAndOperations } from "./cardService.js";

export async function purchase(
    card: Card,
    employee: Employee,
    business: businessRepository.Business,
    amount: number,
    password: string) {

    const cardBelongsToEmployee = cardUtils.checkIfCardBelongsToEmployee(card, employee);
    if (!cardBelongsToEmployee) {
        throw new AppError(403, "The card does not belong to the employee.");
    }

    const cardIsActive = cardUtils.checkIfTheCardIsActive(card);
    if (!cardIsActive) {
        throw new AppError(403, "The card is not active.");
    };

    const cardIsExpired = cardUtils.checkIfTheCardIsExpired(card);
    if (cardIsExpired) {
        throw new AppError(403, "The card is expired.");
    };

    const cardIsBlocked = cardUtils.checkIfTheCardIsBlocked(card);
    if (cardIsBlocked) {
        throw new AppError(403, "The card is blocked.");
    };

    const validPassword = cardUtils.validatePassword(card, password);
    if (!validPassword) {
        throw new AppError(403, "The password is invalid.");
    };

    const compatibleType = cardUtils.checkIfCardAndBusinessHasTheSameType(card, business);
    if (!compatibleType) {
        throw new AppError(403, "The card and the business are not of the same type.");
    };

    const { balance } = await getBalanceAndOperations(card);
    if (amount > balance){
        throw new AppError(403, "The employee does not have enough balance.");
    };

    const payment: paymentRepository.PaymentInsertData = {
        cardId: card.id,
        businessId: business.id,
        amount: amount
    }

    await paymentRepository.insert(payment);
}