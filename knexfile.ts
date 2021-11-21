import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
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
    migrations: {
      directory: __dirname + "/src/data/migrations",
    },
    seeds: {
      directory: __dirname + "/src/data/seeds",
    },
  },

  staging: {
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
  },

  production: {
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
  },
};
