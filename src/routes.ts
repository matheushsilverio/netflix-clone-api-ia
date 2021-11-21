import authMiddleware from "@application/middlewares/authMiddleware";
import { authUserController } from "@useCases/User/AuthUser";
import { createUserController } from "@useCases/User/CreateUser";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/users", (request: Request, response: Response) =>
  createUserController.handle(request, response)
);

router.post("/authenticate", (request: Request, response: Response) =>
  authUserController.signIn(request, response)
);

router.post(
  "/authenticate/refresh-token",
  (request: Request, response: Response) =>
    authUserController.refreshToken(request, response)
);

export { router };
