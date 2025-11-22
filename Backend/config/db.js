import { createPool } from "mysql2/promise";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync('/etc/ssl/cert.pem').toString()
  }
});

export default pool;
