import dotenv from "dotenv";
import { IUserRepository } from "@data/DTO/repositories";
import { AuthUserCredentialsDTO, AuthUserDTO } from "./AuthUserDTO";
import { sign, verify } from "jsonwebtoken";
import { ContextParams } from "@useCases/common/CommonDTO";
import Crypto from "@application/helpers/Crypto";
dotenv.config();
export class AuthUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY),
    private refreshTokenPrivateKey = String(
      process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY
    )
  ) {}

  async signIn(authUserDTO: AuthUserDTO): Promise<AuthUserCredentialsDTO> {
    const user = await this.userRepository.getByCredentials(authUserDTO.email);

    const passwordDescrypted = Crypto.decrypt(user.password);
    if (!user || passwordDescrypted !== authUserDTO.password) {
      throw new Error("Invalid Credentials");
    }

    const token = this.generateJwt({ userId: user.id });
    const refreshToken = this.generateRefreshJwt({ userId: user.id });
    const { password, ...userPublic } = user;

    return { user: userPublic, token, refreshToken };
  }

  async refresh(refreshToken: string): Promise<AuthUserCredentialsDTO> {
    const contextDecoded = this.verifyRefreshToken(refreshToken);

    if (typeof contextDecoded === "string") {
      throw new Error("Invalid Token");
    }

    const user = await this.userRepository.getById(contextDecoded.userId);
    if (!user) throw new Error("Invalid Token");

    const token = this.generateJwt({ userId: contextDecoded.userId });
    const newRefreshToken = this.generateRefreshJwt({
      userId: contextDecoded.userId,
    });
    const { password, ...userPublic } = user;

    return { user: userPublic, token, refreshToken: newRefreshToken };
  }

  private generateJwt(contextParams: ContextParams) {
    return sign(contextParams, this.tokenPrivateKey, { expiresIn: "24h" });
  }

  private generateRefreshJwt(contextParams: ContextParams) {
    return sign(contextParams, this.refreshTokenPrivateKey, {
      expiresIn: "7d",
    });
  }

  private verifyRefreshToken(refreshToken: string) {
    return verify(refreshToken, this.refreshTokenPrivateKey);
  }
}
