import { User } from "@/entities/user/user.entity";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { LogsService } from "@/logs/schemas/logs.service";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface FetchAllUserUseCaseResponse {
  users: User[];
}
@Injectable()
export class FetchAllUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private logsServerice: LogsService,
  ) {}

  async execute(): Promise<FetchAllUserUseCaseResponse> {
    const users = await this.usersRepository.findAll();

    if (!users) {
      await this.logsServerice.createLog({
        message: "Users not found",
        timestamp: new Date(),
        level: "erro",
        context: "FetchAllUserUseCase",
      });

      throw new UserNotFoundError();
    }

    return {
      users,
    };
  }
}
