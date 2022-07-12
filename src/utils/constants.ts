import dotenv from "dotenv";

dotenv.config();

export const CARD_FORMAT =  "#### #### #### ####";
export const MIN_NAME_LENGTH = 3;
export const CARD_DATE_FORMAT = "MM/YY";
export const OPERATION_TIMESTAMP_FORMAT = "DD/MM/YYYY";
export const ADDITIONAL_YEARS = 5;
export const SECRET_KEY = process.env.SECRET_KEY || "secretKey";
export const PASSWORD_LENGTH = 4;
export const PASSWORD_FORMART = '^[0-9]{4}$';
export const SECURITY_CODE_LENGTH = 3;
export const EXPIRATION_DAY = (1).toString().padStart(2,"0");
export const MIN_RECHARGE = 1;
