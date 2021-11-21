import { Knex } from "knex";
import Logger from "@application/helpers/Logger";
import Crypto from "@application/helpers/Crypto";
import csv from "csv-parser";
import fs from "fs";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
  const select = await knex("users").select().limit(1);
  if (select.length > 0) {
    return;
  }
  const password = Crypto.encrypt("123");

  const data = [];

  let a = 1;
  while (a <= 10) {
    data.push({
      name: `Jhon Doe ${a}`,
      email: `test${a}@test.com`,
      password,
    });
    a++;
  }

  Logger.debug("SEED", "User Seeds are running");
  await knex("users").insert(data);
  Logger.debug("SEED", `${data.length} user seeds has been completed`);
}

async function userRatesSeed(knex: Knex): Promise<void> {
  const select = await knex("users_rate").select().limit(1);
  if (select.length > 0) {
    return;
  }
  const users = await knex("users").select("id");
  const randomMovies = await knex("movies")
    .select("id_movie")
    .orderBy("year", "desc")
    .orderByRaw("rand()")
    .limit(40);

  Logger.debug("SEED", "Users Rate Seeds are running");
  for (let user of users) {
    const newRatings = [];
    const times_vote = randomIntFromInterval(10, 40);

    let i = 0;
    while (i < times_vote) {
      newRatings.push({
        id_user: user.id,
        id_movie: randomMovies[i].id_movie,
        rate: randomIntFromInterval(1, 5),
      });

      i++;
    }

    await knex("users_rate").insert(newRatings);
  }

  Logger.debug("SEED", `User Rate seeds has been completed`);
}

export async function seed(knex: Knex): Promise<void> {
  Logger.debug("DB", "Seeds are running");
  await Promise.all([moviesSeed(knex), usersSeed(knex)])
    .then(async () => {
      await userRatesSeed(knex);
      Logger.debug("SEED", "All seed has been completed");
    })
    .catch((err) => {
      console.log(err);
    });
}
