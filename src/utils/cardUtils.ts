import { faker } from "@faker-js/faker";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import AppError from "./appErros.js";

const cardFormat = process.env.cardFormat || "#### #### #### ####";

export async function checkIfEmployeeBelongsToCompany(employee: Employee, company: Company) {
    if (employee.companyId != company.id) {
        throw new AppError(409, "The employee does not belong to the company.");
    }
};

export async function checkIfEmployeeHasThisCard(employee: Employee, cardType: cardRepository.TransactionTypes) {
    const card = await cardRepository.findByTypeAndEmployeeId(cardType, employee.id);
    if (card) {
        throw new AppError(409, "The employee already has this type of card.");
    }
};

export function generateCardNumber() {
    const cardNumber = faker.finance.creditCardNumber(cardFormat);
    return cardNumber;
}   