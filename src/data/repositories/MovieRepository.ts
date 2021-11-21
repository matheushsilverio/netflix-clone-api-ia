import { DatabaseConnection } from "@data/Database";
import { MovieQueryResponse } from "@data/DTO/entities/MovieDTO";
import { IMovieRepository } from "@data/DTO/repositories";
import MovieMapper from "@data/mappers/MovieMapper";
import { Movie } from "@entities/Movie";
import { Knex } from "knex";

export default class MovieRepository implements IMovieRepository {
  private connection: Knex;

  constructor() {
    this.connection = DatabaseConnection;
  }

  async getByCategory(category: string): Promise<Movie[]> {
    const query = await this.connection("movies")
      .select<MovieQueryResponse[]>(
        "id_movie",
        "imdb_title_id",
        "title",
        "year",
        "date_published",
        "genre",
        "duration",
        "avg_note",
        "description"
      )
      .where("genre", "LIKE", `%${category}%`)
      .where("country", "LIKE", `%USA%`)
      .limit(15)
      .orderBy("year", "desc")
      .orderBy("avg_note", "desc");

    return MovieMapper.mapMany(query);
  }
}
