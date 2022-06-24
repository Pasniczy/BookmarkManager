import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
const { DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

export const pool = createPool({
  host: DB_HOST || "localhost",
  port: parseInt(DB_PORT, 10) || 8889,
  user: DB_USER,
  password: DB_PASSWORD,
  database: "bookmark_manager",
  namedPlaceholders: true,
  decimalNumbers: true,
});
