import { RefreshTokenUseCase } from "@/domain/application/use-cases/refresh-token";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("/refresh")
export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Post()
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenUseCase.execute(refreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
