import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import { debugMiddleware } from "@application/middlewares/debugMiddleware";
import responseMiddleware from "@application/middlewares/responseMiddleware";

const app: Application = express();

app.use(helmet());
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: true,
  methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "PATCH", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(responseMiddleware);
app.use(debugMiddleware);

app.use("/", router);

export { app };
