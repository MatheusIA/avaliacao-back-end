import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { RefreshTokenService } from "@/infra/cryptography/refresh-token.service";
import { LogsService } from "@/logs/schemas/logs.service";

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
    private logsService: LogsService,
  ) {}

  async execute({
    email,
    password,
    cpf,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    let user;
    let isPasswordValid = false;

    if (email) {
      user = await this.usersRepository.findByEmail(email);
    } else if (cpf) {
      user = await this.usersRepository.findByCPF(cpf);
    }

    if (!user || !user.active) {
      if (process.env.NODE_ENV !== "test") {
        await this.logsService.createLog({
          message: "The password entered is wrong or the user is inactive",
          timestamp: new Date(),
          level: "error",
          context: "AuthenticateUserUseCase",
        });
      }
      throw new WrongCredentialsError();
    }

    if (password) {
      isPasswordValid = await this.hashComparer.compare(
        password,
        user.password,
      );
    }

    if (!isPasswordValid) {
      if (process.env.NODE_ENV !== "test") {
        await this.logsService.createLog({
          message: "The password entered is wrong",
          timestamp: new Date(),
          level: "error",
          context: "AuthenticateUserUseCase",
        });
      }
      throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id?.toString(),
    });

    const refreshToken = await this.refreshTokenService.generateRefreshToken({
      email,
      cpf,
    });

    if (process.env.NODE_ENV !== "test") {
      await this.logsService.createLog({
        message: `User with email ${email} accessed the system`,
        timestamp: new Date(),
        level: "info",
        context: "AuthenticateUserUseCase",
      });
    }

    return {
      accessToken,
      refreshToken,
    };
  }
}
