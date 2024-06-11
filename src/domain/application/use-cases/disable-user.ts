import { User } from "@/entities/user/user.entity";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { TokenService } from "@/entities/tokens/invalid-token.service";

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
  ) {}

  async execute({
    id,
    active,
    token,
  }: DisableUserUseCaseRequest): Promise<DisableUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    user.active = active;

    await this.usersRepository.updateUser(user);

    await this.tokenService.invalidateToken(token);

    return {
      user,
    };
  }
}
