import { Movie } from "@entities/Movie";

export default interface IMovieRepository {
  getByCategory(category: string): Promise<Movie[]>;
  getById(id: number): Promise<Movie | undefined>;
}
