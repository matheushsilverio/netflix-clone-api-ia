import Logger from "@application/helpers/Logger";
import { NextFunction, Request, request, Response } from "express";

abstract class ResponseMiddleware {
  static created(response: Response, value: any): Response {
    response.status(201);
    return response.json(value);
  }

  static success(response: Response, value: any): Response {
    response.status(200);
    return response.json(value);
  }

  static forbidden(response: Response, message?: string): Response {
    const messageResponse = message || "Access Denied";
    response.status(403);
    return response.json({ message: messageResponse });
  }

  static internalError(response: Response, message?: string): Response {
    const messageResponse = message || "Internal Server Error";
    response.status(500);
    return response.json({ message: messageResponse });
  }

  static badRequest(response: Response, message?: string): Response {
    const messageResponse = message || "Bad Request";
    response.status(400);
    return response.json({ message: messageResponse });
  }

  static notFound(response: Response, message?: string): Response {
    const messageResponse = message || "Resource Not Found";
    response.status(404);
    return response.json({ message: messageResponse });
  }

  static error(response: Response, error: Error | string): Response {
    const message = error instanceof Error ? error.message : error;
    const reason =
      error instanceof Error ? error.stack || error.message : error;
    Logger.error(reason);

    if (this[message]) {
      return this[message](response);
    } else {
      return this.internalError(response, "Internal Server Error");
    }
  }
}

export default function responseMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  response.created = (value: any) =>
    ResponseMiddleware.created(response, value);
  response.success = (value: any) =>
    ResponseMiddleware.success(response, value);
  response.forbidden = (message?: string) =>
    ResponseMiddleware.forbidden(response, message);
  response.internalError = (message?: string) =>
    ResponseMiddleware.internalError(response, message);
  response.badRequest = (message?: string) =>
    ResponseMiddleware.badRequest(response, message);
  response.notFound = (message?: string) =>
    ResponseMiddleware.notFound(response, message);
  response.error = (error: Error | string) =>
    ResponseMiddleware.error(response, error);
  next();
}
