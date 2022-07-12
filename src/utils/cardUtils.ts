import { faker } from "@faker-js/faker";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import AppError from "./appErros.js";

import * as constants from "./constants.js";

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
    const cardNumber = faker.finance.creditCardNumber(constants.CARD_FORMAT);
    return cardNumber;
};

export function formatCardName(employeeName: string) {
    const employeeNameArray = employeeName.split(" ");

    const firstName = employeeNameArray[0].toUpperCase();

    const lastIndex = employeeNameArray.length - 1;
    const lastName = employeeNameArray[lastIndex].toUpperCase();

    const middleNamesArray = employeeNameArray.slice(1, lastIndex);
    const formatedMiddleNamesArray = formatMiddleNames(middleNamesArray);

    const formatedCardName = `${firstName} ${formatedMiddleNamesArray.join(" ")} ${lastName}`;
    return formatedCardName;
};

function formatMiddleNames(middleNames: string[]) {
    return middleNames.reduce((formatedNames: string[], name: string) => {
        if (name.length >= constants.MIN_NAME_LENGTH) {
            formatedNames.push(name[0].toUpperCase())
        }
        return formatedNames;
    }, []);
};