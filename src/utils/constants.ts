import dotenv from "dotenv";

dotenv.config();

export const CARD_FORMAT =  "#### #### #### ####";
export const MIN_NAME_LENGTH = 3;
export const DATE_FORMAT = "MM/YY";
export const ADDITIONAL_YEARS = 5;
export const SECRET_KEY = process.env.SECRET_KEY || "secretKey";
export const PASSWORD_LENGTH = 4;
export const SECURITY_CODE_LENGTH = 3;