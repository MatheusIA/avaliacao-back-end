import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { RefreshTokenService } from "@/infra/cryptography/refresh-token.service";

interface AuthenticateUserUseCaseRequest {
  email?: string;
  password: string;
  cpf?: string;
}

interface AuthenticateUserUseCaseResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async execute({
    email,
    password,
    cpf,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    try {
      let user;
      let isPasswordValid = false;

      if (email) {
        user = await this.usersRepository.findByEmail(email);
      } else if (cpf) {
        user = await this.usersRepository.findByCPF(cpf);
      }

      if (!user || !user.active) {
        throw new WrongCredentialsError();
      }

      if (password) {
        isPasswordValid = await this.hashComparer.compare(
          password,
          user.password,
        );
      }

      if (!isPasswordValid) {
        throw new Error();
      }

      const accessToken = await this.encrypter.encrypt({
        sub: user.id?.toString(),
      });

      const refreshToken = await this.refreshTokenService.generateRefreshToken({
        email,
        cpf,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Error in AuthenticateUserUseCase: ", error);
      throw error;
    }
  }
}
