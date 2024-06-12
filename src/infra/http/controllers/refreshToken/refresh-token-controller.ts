import { RefreshTokenUseCase } from "@/domain/application/use-cases/refresh-token";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Refresh_Token")
@Controller("/refresh")
export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: "Refresh Token" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        refreshToken: { type: "string" },
      },
      required: ["refreshToken"],
    },
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: "Authorization",
    description: "Token JWT necessário no formato Bearer <token>",
    required: true,
  })
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenUseCase.execute(refreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
