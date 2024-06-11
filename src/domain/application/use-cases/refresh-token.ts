import { RefreshTokenService } from "@/infra/cryptography/refresh-token.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async execute(refreshToken: string) {
    const isValidRefreshToken =
      await this.refreshTokenService.validateRefreshToken(refreshToken);

    if (!isValidRefreshToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const decodedToken = this.jwtService.decode(refreshToken) as {
      email?: string;
      cpf?: string;
    };

    const newAccessToken = await this.jwtService.signAsync({
      sub: decodedToken.email || decodedToken.cpf,
    });

    const newRefreshToken = await this.refreshTokenService.generateRefreshToken(
      { email: decodedToken.email, cpf: decodedToken.cpf },
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
