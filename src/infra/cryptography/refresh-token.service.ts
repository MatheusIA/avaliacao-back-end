import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService) {}

  async generateRefreshToken(
    payload: Record<string, unknown>,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: "7d" }); // Configura o tempo de expiração do refresh token
  }

  async validateRefreshToken(token: string): Promise<boolean> {
    try {
      const isValid = await this.jwtService.verifyAsync(token);

      return !!isValid;
    } catch (error) {
      return false;
    }
  }
}
