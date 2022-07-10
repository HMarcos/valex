import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

let databaseConfig = null;

databaseConfig = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
    databaseConfig = {
        ...databaseConfig,
        ssl: {
            rejectUnauthorized: false,
        }
    }
};

export const connection = new Pool(databaseConfig);



