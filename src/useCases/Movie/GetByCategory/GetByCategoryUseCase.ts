import { IMovieRepository } from "@data/DTO/repositories";
import { Movie } from "@entities/Movie";

export class GetByCategoryUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(category: string): Promise<Movie[]> {
    const movies = await this.movieRepository.getByCategory(category);
    return movies;
  }
}
