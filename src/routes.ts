import authMiddleware from "@application/middlewares/authMiddleware";
import { getByCategoryController } from "@useCases/Movie/GetByCategory";
import { getByIdController } from "@useCases/Movie/GetById";
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

router.get(
  "/movies/:id",
  authMiddleware,
  (request: Request, response: Response) =>
    getByIdController.handle(request, response)
);

router.get(
  "/movies/categories/:category",
  authMiddleware,
  (request: Request, response: Response) =>
    getByCategoryController.handle(request, response)
);

export { router };
