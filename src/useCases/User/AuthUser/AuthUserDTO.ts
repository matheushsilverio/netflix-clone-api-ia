import { User } from "@entities/User";

export interface AuthUserDTO {
  email: string;
  password: string;
}

export interface AuthUserCredentialsDTO {
  user: User;
  token: string;
  refreshToken: string;
}
