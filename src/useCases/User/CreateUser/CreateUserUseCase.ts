import Crypto from "@application/helpers/Crypto";
import { IUserRepository } from "@data/DTO/repositories";
import { User } from "@entities/User";
import { CreateUserBodyDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(createUserDTO: CreateUserBodyDTO): Promise<User | undefined> {
    const password = Crypto.encrypt(createUserDTO.password);
    const user = new User({ ...createUserDTO, password });

    const createdId = await this.userRepository.create(user);

    const newUser = await this.userRepository.getById(createdId);
    return newUser;
  }
}
