import { Request, Response } from "express";
import { CreateUserBodyDTO } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const user = await this.createUserUseCase.execute(
        body as CreateUserBodyDTO
      );
      return response.created(user);
    } catch (err) {
      return response.error(err);
    }
  }
}
