import * as cardUtils from "./../utils/cardUtils.js";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(company: Company, employee: Employee, cardType: TransactionTypes) {
    console.log(company);
    console.log(employee);
    console.log(cardType);
    await cardUtils.checkIfEmployeeBelongsToCompany(employee, company);
}