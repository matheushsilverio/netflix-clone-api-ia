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

  static mapOne(query: MovieQueryResponse): Movie | undefined {
    return new Movie({
      id: query.id_movie,
      imdbId: query.imdb_title_id,
      title: query.title,
      description: query.description,
      genre: query.genre,
      duration: Number(query.duration),
      year: Number(query.year),
      averageNote: query.avg_note,
      datePublished: query.date_published,
    });
  }
}
