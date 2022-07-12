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
    const encryptedSecurityCode = cardUtils.generateEncryptedSecurityCode();

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
};

export async function activeCard(card: cardRepository.Card, employee: Employee) {
    console.log(card);
    console.log(employee);

    cardUtils.checkIfCardBelongsToEmployee(card, employee);
    cardUtils.checkIfTheCardIsAlreadyActive(card);
    cardUtils.checkIfTheCardIsExpired(card);
}