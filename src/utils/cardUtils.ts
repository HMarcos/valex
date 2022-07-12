import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import * as constants from "./constants.js";
import Cryptr from "cryptr";


export function checkIfEmployeeBelongsToCompany(employee: Employee, company: Company) {
    if (employee.companyId != company.id) {
        return false;
    }
    return true;
};

export async function checkIfEmployeeHasThisCard(employee: Employee, cardType: cardRepository.TransactionTypes) {
    const card = await cardRepository.findByTypeAndEmployeeId(cardType, employee.id);
    if (card) {
        return true;
    }
    return false;
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
    const formatedExpirationDate = expirationDate.format(constants.CARD_DATE_FORMAT);
    return formatedExpirationDate;
};

export function generateEncryptedSecurityCode() {
    const cryptr = new Cryptr(constants.SECRET_KEY);
    const securityCode = faker.finance.creditCardCVV();
    const encryptedSecurityCode = cryptr.encrypt(securityCode);
    return { securityCode, encryptedSecurityCode };
};

export function checkIfCardBelongsToEmployee(card: cardRepository.Card, employee: Employee) {
    if (card.employeeId !== employee.id) {
        return false;
    }
    return true;
};

export function validateSecurityCode(card: cardRepository.Card, securityCode: string) {
    const cryptr = new Cryptr(constants.SECRET_KEY);
    const validSecurityCode = cryptr.decrypt(card.securityCode);
    if (validSecurityCode !== securityCode) {
        return false;
    }
    return true;
};

export function checkIfTheCardIsActive(card: cardRepository.Card) {
    if (card.password) {
        return true;
    }
    return false;
};

export function checkIfTheCardIsExpired(card: cardRepository.Card) {
    const { month: expirationMonth, year: expirationYear } = getExpirationDateInfo(card.expirationDate);
    const formatedExpirationDate = `${expirationMonth}/${constants.EXPIRATION_DAY}/${expirationYear}`;
    const expirationDate = dayjs(formatedExpirationDate);
    const today = dayjs();
    if (today.isAfter(expirationDate)) {
        return true;
    }
    return false;
}

function getExpirationDateInfo(expirationDate: string) {
    const [month, year] = expirationDate.split('/');
    return {
        month,
        year
    }
};

export function encryptPassword(password: string) {
    const cryptr = new Cryptr(constants.SECRET_KEY);
    const encryptedPassword = cryptr.encrypt(password);
    return encryptedPassword;
};

export async function getAllCardPayments(cardId: number) {
    let payments = await paymentRepository.findByCardId(cardId);
    payments = formatOperationTimestamp(payments);
    const amounts = payments.map(payment => payment.amount);
    const totalSpent = sumArrayValues(amounts);
    return {
        totalSpent,
        payments
    };
};

export async function getAllCardRecharges(cardId: number) {
    let recharges = await rechargeRepository.findByCardId(cardId);
    recharges = formatOperationTimestamp(recharges);
    const amounts = recharges.map(recharge => recharge.amount);
    const totalRecharged = sumArrayValues(amounts);
    return {
        totalRecharged,
        recharges
    };
};

function sumArrayValues(array: number[]) {
    return array.reduce((partialSum, value) => partialSum + value, 0);
};

function formatOperationTimestamp(operations: any) {
    const formatedOperations = operations.map((operation) => {
        const formatedTimestamp = dayjs(operation.timestamp)
            .format(constants.OPERATION_TIMESTAMP_FORMAT);
        delete operation.timestamp;
        return {
            ...operation,
            timestamp: formatedTimestamp
        }
    })

    return formatedOperations;
}
