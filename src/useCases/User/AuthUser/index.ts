import { UserRepository } from "@data/repositories";
import { AuthUserController } from "./AuthUserController";
import { AuthUserUseCase } from "./AuthUserUseCase";

const userRepository = new UserRepository();
const authUserUserCase = new AuthUserUseCase(userRepository);
const authUserController = new AuthUserController(authUserUserCase);

export { authUserUserCase, authUserController };
