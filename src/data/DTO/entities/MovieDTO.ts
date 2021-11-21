export interface MovieQueryResponse {
  readonly id_movie: number;
  readonly imdb_title_id: string;
  readonly title: string;
  readonly description: string;
  readonly year: number;
  readonly date_published: Date;
  readonly genre: string;
  readonly duration: string;
  readonly avg_note: number;
}
