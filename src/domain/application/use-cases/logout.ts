import { TokenService } from "@/entities/tokens/invalid-token.service";
import { Injectable } from "@nestjs/common";

interface LogoutUseCaseRequest {
  token: string;
}

@Injectable()
export class LogoutUseCase {
  constructor(private tokenService: TokenService) {}

  async execute({ token }: LogoutUseCaseRequest): Promise<void> {
    await this.tokenService.invalidateToken(token);
  }
}
