import * as cardUtils from "./../utils/cardUtils.js";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(company: Company, employee: Employee, cardType: TransactionTypes) {
    console.log(company);
    console.log(employee);
    console.log(cardType);
    await cardUtils.checkIfEmployeeBelongsToCompany(employee, company);
    await cardUtils.checkIfEmployeeHasThisCard(employee, cardType);

    const cardNumber = cardUtils.generateCardNumber();
    const formatedCardName = cardUtils.formatCardName(employee.fullName);
    const expirationDate = cardUtils.calculateExpirationDate();
    const encryptedSecurityCode = cardUtils.generateEncryptedSecurityCode();
    console.log(cardNumber, formatedCardName, expirationDate, encryptedSecurityCode);
}