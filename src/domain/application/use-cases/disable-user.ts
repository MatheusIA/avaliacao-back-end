import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { TokenService } from "@/entities/tokens/invalid-token.service";
import { User } from "@/entities/user/user.entity";
import { LogsService } from "@/logs/schemas/logs.service";

interface DisableUserUseCaseRequest {
  id: number;
  active: boolean;
  token: string;
}

interface DisableUserUseCaseResponse {
  user: User;
}

@Injectable()
export class DisableUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
    private logsService: LogsService,
  ) {}

  async execute({
    id,
    active,
    token,
  }: DisableUserUseCaseRequest): Promise<DisableUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      await this.logsService.createLog({
        message: `User not found`,
        timestamp: new Date(),
        level: "error",
        context: "DisableUserUseCase",
      });
      throw new UserNotFoundError();
    }

    user.active = active;

    await this.usersRepository.updateUser(user);

    await this.logsService.createLog({
      message: `User updated successfully`,
      timestamp: new Date(),
      level: "info",
      context: "DisableUserUseCase",
    });

    await this.tokenService.invalidateToken(token);
    await this.logsService.createLog({
      message: `Token invalid successfully`,
      timestamp: new Date(),
      level: "info",
      context: "DisableUserUseCase",
    });

    return {
      user,
    };
  }
}
