import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import AppError from "./appErros.js";

import * as constants from "./constants.js";
import Cryptr from "cryptr";


export function checkIfEmployeeBelongsToCompany(employee: Employee, company: Company) {
    if (employee.companyId != company.id) {
        throw new AppError(403, "The employee does not belong to the company.");
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

export function calculateExpirationDate() {
    const today = dayjs();
    const expirationDate = today.add(constants.ADDITIONAL_YEARS, 'year');
    const formatedExpirationDate = expirationDate.format(constants.DATE_FORMAT);
    return formatedExpirationDate;
};

export function generateEncryptedSecurityCode() {
    const cryptr = new Cryptr(constants.SECRET_KEY);
    const securityCode = faker.finance.creditCardCVV();
    const encryptedSecurityCode = cryptr.encrypt(securityCode);
    return  encryptedSecurityCode;
};

export function checkIfCardBelongsToEmployee(card: cardRepository.Card, employee: Employee) {
    if (card.employeeId !== employee.id){
        throw new AppError(403, "The card does not belong to the employee.");
    }
};

export function checkIfTheCardIsAlreadyActive(card: cardRepository.Card) {
    if (card.password) {
        throw new AppError(403, "The card is already active.");
    }
};

export function checkIfTheCardIsExpired(card: cardRepository.Card){
    const {month: expirationMonth, year: expirationYear} = getExpirationDateInfo(card.expirationDate);
    const formatedExpirationDate = `${expirationMonth}/${constants.EXPIRATION_DAY}/${expirationYear}`;
    const expirationDate = dayjs(formatedExpirationDate);
    const today = dayjs();
    if (today.isAfter(expirationDate)) {
        throw new AppError(403, "The card is expired.");
    }
}

function getExpirationDateInfo(expirationDate: string){
    const [month, year] = expirationDate.split('/');
    return {
        month,
        year
    }
}
