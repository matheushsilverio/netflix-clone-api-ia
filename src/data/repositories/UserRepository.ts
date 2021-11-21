import { DatabaseConnection } from "@data/Database";
import { UserQueryResponse } from "@data/DTO/entities/UserDTO";
import { IUserRepository } from "@data/DTO/repositories";
import UserMapper from "@data/mappers/UserMapper";
import { User } from "@entities/User";
import { Knex } from "knex";

export default class UserRepository implements IUserRepository {
  private connection: Knex;

  constructor() {
    this.connection = DatabaseConnection;
  }

  async create(user: User): Promise<number> {
    const [createdId] = await this.connection("users").insert({
      email: user.email,
      name: user.name,
      password: user.password,
    });
    return createdId;
  }

  async getById(id: number): Promise<User | undefined> {
    const queryUser = await this.connection("users")
      .select<UserQueryResponse>(
        "users.id",
        "users.name",
        "users.email",
        "users.created_at",
        "users.updated_at"
      )
      .where("users.id", id)
      .first();

    return UserMapper.mapOne(queryUser);
  }

  async getByCredentials(email: string): Promise<User | undefined> {
    const queryUser = await this.connection("users")
      .select<UserQueryResponse>(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.created_at",
        "users.updated_at"
      )
      .where("users.email", email)
      .first();

    return UserMapper.mapOne(queryUser);
  }
}
