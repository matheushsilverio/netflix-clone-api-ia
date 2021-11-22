import { IMovieRepository } from "@data/DTO/repositories";
import { Movie } from "@entities/Movie";

export class GetByIdUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(id: number): Promise<Movie | undefined> {
    const movie = await this.movieRepository.getById(id);
    return movie;
  }
}
