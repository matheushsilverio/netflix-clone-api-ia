import { Request, Response } from "express";
import { GetByIdUseCase } from "./GetByIdUseCase";

export class GetByIdController {
  constructor(private getByIdUseCase: GetByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      console.log(id);
      const movie = await this.getByIdUseCase.execute(id);
      return response.success(movie);
    } catch (err) {
      return response.error(err);
    }
  }
}
