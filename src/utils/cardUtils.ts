import { Company } from "../repositories/companyRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import AppError from "./appErros.js";

export async function checkIfEmployeeBelongsToCompany(employee: Employee, company: Company) {
    if (employee.companyId != company.id) {
        throw new AppError(409, "The employee does not belong to the company.");
    }
}