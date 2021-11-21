import { User } from "@entities/User";

export default interface IUserRepository {
  create(user: User): Promise<number>;
  getById(id: number): Promise<User | undefined>;
  getByCredentials(email: string): Promise<User | undefined>;
}
