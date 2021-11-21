import { MovieQueryResponse } from "@data/DTO/entities/MovieDTO";
import { Movie } from "@entities/Movie";

export default abstract class MovieMapper {
  static mapMany(query: MovieQueryResponse[]): Movie[] {
    return query.map((movie) => {
      return new Movie({
        id: movie.id_movie,
        imdbId: movie.imdb_title_id,
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        duration: Number(movie.duration),
        year: Number(movie.year),
        averageNote: movie.avg_note,
        datePublished: movie.date_published,
      });
    });
  }
}
