import MovieRepository from "@data/repositories/MovieRepository";
import { GetByCategoryController } from "./GetByCategoryController";
import { GetByCategoryUseCase } from "./GetByCategoryUseCase";

const movieRepository = new MovieRepository();
const getByCategoryUseCase = new GetByCategoryUseCase(movieRepository);
const getByCategoryController = new GetByCategoryController(
  getByCategoryUseCase
);

export { getByCategoryController, getByCategoryUseCase };
