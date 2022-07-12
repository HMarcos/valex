import * as cardUtils from "./../utils/cardUtils.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import AppError from "../utils/appErros.js";

export async function createCard(company: Company, employee: Employee, cardType: cardRepository.TransactionTypes) {

    const employeeBelongsToCompany = cardUtils.checkIfEmployeeBelongsToCompany(employee, company);
    if (!employeeBelongsToCompany) {
        throw new AppError(403, "The employee does not belong to the company.");
    }

    const employeeHasThisCard = await cardUtils.checkIfEmployeeHasThisCard(employee, cardType);
    if (employeeHasThisCard) {
        throw new AppError(409, "The employee already has this type of card.")
    }

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

    const cardBelongsToEmployee = cardUtils.checkIfCardBelongsToEmployee(card, employee);
    if (!cardBelongsToEmployee) {
        throw new AppError(403, "The card does not belong to the employee.");
    }

    const validSecurityCode = cardUtils.validateSecurityCode(card, securityCode);
    if (!validSecurityCode) {
        throw new AppError(403, "The security code is invalid.");
    }

    const cardIsAlreadyActive = cardUtils.checkIfTheCardIsActive(card);
    if (cardIsAlreadyActive) {
        throw new AppError(403, "The card is already active.")
    }

    const cardIsExpired = cardUtils.checkIfTheCardIsExpired(card);
    if (cardIsExpired) {
        throw new AppError(403, "The card is expired.");
    }

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

export async function blockCard(card: cardRepository.Card, employee: Employee, password: string) {

    const cardBelongsToEmployee = cardUtils.checkIfCardBelongsToEmployee(card, employee);
    if (!cardBelongsToEmployee) {
        throw new AppError(403, "The card does not belong to the employee.");
    };

    const cardIsActive = cardUtils.checkIfTheCardIsActive(card);
    if (!cardIsActive) {
        throw new AppError(403, "The card is not active.")
    };

    const cardIsExpired = cardUtils.checkIfTheCardIsExpired(card);
    if (cardIsExpired) {
        throw new AppError(403, "The card is expired.");
    };

    const cardIsBlocked = cardUtils.checkIfTheCardIsBlocked(card);
    if (cardIsBlocked) {
        throw new AppError(403, "The card is already blocked.");
    };

    const validPassword = cardUtils.validatePassword(card, password);
    if (!validPassword) {
        throw new AppError(403, "The password is invalid.");
    };

    await cardRepository.update(card.id, { isBlocked: true });
};

export async function unlockCard(card: cardRepository.Card, employee: Employee, password: string) {

    const cardBelongsToEmployee = cardUtils.checkIfCardBelongsToEmployee(card, employee);
    if (!cardBelongsToEmployee) {
        throw new AppError(403, "The card does not belong to the employee.");
    };

    const cardIsActive = cardUtils.checkIfTheCardIsActive(card);
    if (!cardIsActive) {
        throw new AppError(403, "The card is not active.");
    };

    const cardIsExpired = cardUtils.checkIfTheCardIsExpired(card);
    if (cardIsExpired) {
        throw new AppError(403, "The card is expired.");
    };

    const validPassword = cardUtils.validatePassword(card, password);
    if (!validPassword) {
        throw new AppError(403, "The password is invalid.");
    };

    const cardIsUnlocked = cardUtils.checkIfTheCardIsUnlocked(card);
    if (cardIsUnlocked) {
        throw new AppError(403, "The card is already unlocked.");
    };

    await cardRepository.update(card.id, { isBlocked: false });
};

