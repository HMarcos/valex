import * as cardUtils from "./../utils/cardUtils.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";

export async function createCard(company: Company, employee: Employee, cardType: cardRepository.TransactionTypes) {

    cardUtils.checkIfEmployeeBelongsToCompany(employee, company);
    await cardUtils.checkIfEmployeeHasThisCard(employee, cardType);

    const cardNumber = cardUtils.generateCardNumber();
    const formatedCardName = cardUtils.formatCardName(employee.fullName);
    const expirationDate = cardUtils.calculateExpirationDate();
    const { securityCode, encryptedSecurityCode } = cardUtils.generateEncryptedSecurityCode();

    const card: cardRepository.CardInsertData = {
        employeeId: employee.id,
        number: cardNumber,
        cardholderName: formatedCardName,
        securityCode: encryptedSecurityCode,
        expirationDate: expirationDate,
        isVirtual: false,
        isBlocked: true,
        type: cardType
    }

    await cardRepository.insert(card);

    const cardData = {
        numer: card.number,
        name: card.cardholderName,
        expirationDate: card.expirationDate,
        type: card.type,
        securityCode
    }

    return cardData;
};

export async function activeCard(card: cardRepository.Card, employee: Employee, password: string, securityCode: string) {

    cardUtils.checkIfCardBelongsToEmployee(card, employee);
    cardUtils.validateSecurityCode(card, securityCode);
    cardUtils.checkIfTheCardIsAlreadyActive(card);
    cardUtils.checkIfTheCardIsExpired(card);

    const encryptedPassword = cardUtils.encryptPassword(password);
    await cardRepository.update(card.id, { password: encryptedPassword });
};

export async function getBalanceAndOperations(card: cardRepository.Card) {
    const { totalSpent, payments: transactions } = await cardUtils.getAllCardPayments(card.id);
    const { totalRecharged, recharges } = await cardUtils.getAllCardRecharges(card.id);

    const balance = totalRecharged - totalSpent;

    return {
        balance,
        transactions,
        recharges
    }
};