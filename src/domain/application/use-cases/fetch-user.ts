import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { User } from "@/entities/user/user.entity";

interface FetchUserUseCaseRequest {
  id: string;
}

interface FetchUserUseCaseResponse {
  user: User;
}

@Injectable()
export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const user = await this.usersRepository.findById(parseInt(id, 10));

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
