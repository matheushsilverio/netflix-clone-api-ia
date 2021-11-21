import { Request, Response } from "express";
import { AuthUserDTO } from "./AuthUserDTO";
import { AuthUserUseCase } from "./AuthUserUseCase";

export class AuthUserController {
  constructor(private authUserUserCase: AuthUserUseCase) {}

  async signIn(request: Request, response: Response): Promise<Response> {
    try {
      if (
        !request.headers.authorization ||
        !request.headers.authorization.includes("Basic ")
      ) {
        return response
          .status(401)
          .json({ message: "Missing Authorization Header" });
      }

      const base64Credentials = request.headers.authorization.split(" ")[1];
      const creadentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
      );
      const [email, password] = creadentials.split(":");
      const userToken = await this.authUserUserCase.signIn({
        email,
        password,
      } as AuthUserDTO);
      return response.created(userToken);
    } catch (err) {
      return response.error(err);
    }
  }

  async refreshToken(request: Request, response: Response): Promise<Response> {
    try {
      const { refreshToken } = request.body;
      if (!refreshToken) throw new Error("Refresh token not informed");

      const data = await this.authUserUserCase.refresh(refreshToken);
      return response.created(data);
    } catch (err) {
      return response.error(err);
    }
  }
}
