import { NextFunction, Request, Response } from "express";
import Logger from "@application/helpers/Logger";
import dotenv from "dotenv";
dotenv.config();

const isDevelopment = process.env.NODE_ENV == "development";

export function debugMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (isDevelopment) {
    Logger.debug("REQUEST", `${request.method.toUpperCase()}: ${request.url}`);
  }

  next();
}
