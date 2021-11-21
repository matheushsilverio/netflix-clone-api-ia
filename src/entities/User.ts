export class User {
  readonly id?: number;
  public name: string;
  public email: string;
  public password?: string;
  readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
