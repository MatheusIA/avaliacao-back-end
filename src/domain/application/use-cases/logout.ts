import { TokenService } from "@/entities/tokens/invalid-token.service";
import { LogsService } from "@/logs/schemas/logs.service";
import { Injectable } from "@nestjs/common";

interface LogoutUseCaseRequest {
  token: string;
}

@Injectable()
export class LogoutUseCase {
  constructor(
    private tokenService: TokenService,
    private logsService: LogsService,
  ) {}

  async execute({ token }: LogoutUseCaseRequest): Promise<void> {
    await this.tokenService.invalidateToken(token);

    if (process.env.NODE_ENV !== "test") {
      await this.logsService.createLog({
        message: `Token invalid successfully`,
        timestamp: new Date(),
        level: "info",
        context: "LogoutUseCase",
      });
    }
  }
}
