import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env.NODE_ENV == "development";

const DatabaseConnection = Knex({
  client: "mysql2",
  connection: {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
  },
  pool: {
    min: Number(process.env.DATABASE_POOL_MIN),
    max: Number(process.env.DATABASE_POOL_MAX),
    idleTimeoutMillis: Number(process.env.DATABASE_POOL_IDLE),
  },
  acquireConnectionTimeout: 5000,
  debug: isDevelopment,
});

export { DatabaseConnection };
