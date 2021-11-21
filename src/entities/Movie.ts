export class Movie {
  readonly id?: number;
  public imdbId: string;
  public title: string;
  public description: string;
  public year: number;
  public datePublished: Date;
  public genre: string;
  public duration: number;
  public averageNote: number;

  constructor(props: Movie) {
    Object.assign(this, props);
  }
}
