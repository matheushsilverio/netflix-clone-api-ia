import { UserQueryResponse } from "@data/DTO/entities/UserDTO";
import { User } from "@entities/User";

export default abstract class UserMapper {
  static mapOne(query: UserQueryResponse): User {
    return new User({
      id: query.id,
      name: query.name,
      email: query.email,
      password: query.password,
      createdAt: query.created_at,
      updatedAt: query.updated_at,
    });
  }
}
