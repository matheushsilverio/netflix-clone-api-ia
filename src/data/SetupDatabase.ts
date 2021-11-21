import knex from "knex";
import dotenv from "dotenv";
import Logger from "@application/helpers/Logger";

dotenv.config();
const isDevelopment = process.env.NODE_ENV == "development";
const configuration = require("knexfile")[process.env.NODE_ENV];

export default async function executeMigrations(): Promise<void> {
  if (isDevelopment) {
    const connection = knex(configuration);
    await connection.migrate.latest();

    await connection.seed.run();
    Logger.debug("DB", "Migrate have been completed");
  }
}
