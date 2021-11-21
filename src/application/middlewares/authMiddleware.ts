import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function getTokenFromHeaders({ headers }: Request) {
  const token = headers.authorization;
  return token ? token.slice(7, token.length) : null;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const token = getTokenFromHeaders(request);
  if (!token) {
    response.badRequest("Identification is not informed");
    return;
  }

  try {
    const tokenDecoded = verify(
      token,
      String(process.env.JWT_TOKEN_PRIVATE_KEY)
    );

    if (typeof tokenDecoded === "string") {
      throw new Error("Invalid Token");
    }

    request.loggedContext = {
      userId: tokenDecoded.userId,
    };

    next();
  } catch (err) {
    response.error(err);
    return;
  }
}
