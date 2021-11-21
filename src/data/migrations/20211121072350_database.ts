import Logger from "@application/helpers/Logger";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  Logger.debug("DB", "Migrate are running");

  const usersIsExisting = await knex.schema.hasTable("users");
  if (!usersIsExisting) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").unsigned().primary();
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.dateTime("created_at").defaultTo(knex.fn.now());
      table.dateTime("updated_at").nullable();
    });
  }

  const usersRateIsExisting = await knex.schema.hasTable("users_rate");
  if (!usersRateIsExisting) {
    await knex.schema.createTable("users_rate", (table) => {
      table.increments("id").unsigned().primary();
      table.integer("id_user").unsigned();
      table.integer("id_movie").notNullable();
      table.double("rate").notNullable();
      table.dateTime("created_at").defaultTo(knex.fn.now());

      table.foreign("id_user").references("users.id");
      table.foreign("id_movie").references("movies.id_movie");
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
