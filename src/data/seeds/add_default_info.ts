import { Knex } from "knex";
import Logger from "@application/helpers/Logger";
import Crypto from "@application/helpers/Crypto";
import csv from "csv-parser";
import fs from "fs";

async function moviesSeed(knex: Knex): Promise<void> {
  const select = await knex("movies").select().limit(1);
  if (select.length > 0) {
    return;
  }

  const movies: Record<string, any>[] = [];
  const readStream = fs
    .createReadStream("src/data/seeds/data/imdb_movies.csv")
    .pipe(
      csv([
        "imdb_title_id",
        "title",
        "original_title",
        "year",
        "date_published",
        "genre",
        "duration",
        "country",
        "language",
        "director",
        "writer",
        "production_company",
        "actors",
        "description",
        "avg_note",
        "votes",
        "budget",
        "usa_gross_income",
        "worldwide_gross_income",
        "metascore",
        "reviews_from_users",
        "reviews_from_critics",
      ])
    );

  for await (let chunk of readStream) {
    let movie: Record<string, any> = chunk;
    chunk.date_published = new Date(chunk.date_published);
    movies.push(chunk);
    console.log(chunk.imdb_title_id);
    await knex("movies").insert(chunk);
  }

  Logger.debug("SEED", `Movies Seeds are running ${movies.length}`);
  Logger.debug("SEED", `${movies.length} Movies seeds has been completed`);
}

async function usersSeed(knex: Knex): Promise<void> {
  const select = await knex("users").select();
  if (select.length > 0) {
    return;
  }
  const password = Crypto.encrypt("123");

  const data = [
    {
      name: "Jhon Doe",
      email: "test@test.com",
      password,
    },
  ];

  Logger.debug("SEED", "User Seeds are running");
  await knex("users").insert(data);
  Logger.debug("SEED", `${data.length} user seeds has been completed`);
}

export async function seed(knex: Knex): Promise<void> {
  Logger.debug("DB", "Seeds are running");
  await Promise.all([moviesSeed(knex), usersSeed(knex)])
    .then(async () => {
      Logger.debug("SEED", "All seed has been completed");
    })
    .catch((err) => {
      console.log(err);
    });
}
