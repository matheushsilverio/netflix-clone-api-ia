import { Request, Response } from "express";
import { GetByCategoryUseCase } from "./GetByCategoryUseCase";

export class GetByCategoryController {
  constructor(private getByCategoryUseCase: GetByCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { category } = request.params;
      const movies = await this.getByCategoryUseCase.execute(
        category as string
      );

      return response.success(movies);
    } catch (err) {
      return response.error(err);
    }
  }
}
