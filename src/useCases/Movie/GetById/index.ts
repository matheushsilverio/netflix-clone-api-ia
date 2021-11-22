import MovieRepository from "@data/repositories/MovieRepository";
import { GetByIdController } from "./GetByIdController";
import { GetByIdUseCase } from "./GetByIdUseCase";

const movieRepository = new MovieRepository();
const getByIdUseCase = new GetByIdUseCase(movieRepository);
const getByIdController = new GetByIdController(getByIdUseCase);

export { getByIdUseCase, getByIdController };
