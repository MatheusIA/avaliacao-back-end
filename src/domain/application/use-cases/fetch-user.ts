import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { User } from "@/entities/user/user.entity";
import { LogsService } from "@/logs/schemas/logs.service";

interface FetchUserUseCaseRequest {
  id: string;
}

interface FetchUserUseCaseResponse {
  user: User;
}

@Injectable()
export class FetchUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private logsService: LogsService,
  ) {}

  async execute({
    id,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const user = await this.usersRepository.findById(parseInt(id, 10));

    if (!user) {
      await this.logsService.createLog({
        message: `User not found`,
        timestamp: new Date(),
        level: "error",
        context: "FetchUserUseCase",
      });
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
