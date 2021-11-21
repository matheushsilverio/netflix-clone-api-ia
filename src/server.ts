import { app } from "./app";
import Logger from "@application/helpers/Logger";
import dotenv from "dotenv";
import executeMigrations from "@data/SetupDatabase";

dotenv.config();

const port = process.env.PORT || "3333";
const environment = process.env.NODE_ENV;

executeMigrations().then(() => {
  app.listen(port, async () => {
    Logger.startingServer(environment, port);
  });
});
