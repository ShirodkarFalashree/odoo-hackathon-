import { createPool } from "mysql2/promise";
import { readFileSync, existsSync } from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Resolve SSL certificate dynamically
let sslOptions = undefined;

if (process.env.DB_SSL === "true") {
  const certPath = process.env.DB_SSL_CA;

  if (existsSync(certPath)) {
    console.log("✔ SSL Certificate Loaded:", certPath);
    sslOptions = {
      rejectUnauthorized: true,
      ca: readFileSync(certPath).toString(),
    };
  } else {
    console.warn("⚠ SSL Cert NOT found, continuing WITHOUT SSL:", certPath);
  }
}

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: sslOptions, // Works on all OS
});

export default pool;
