import { Encrypter } from "@/domain/application/cryptography/encrypter";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenService } from "./refresh-token.service";

@Injectable()
export class JwtEncrypet implements Encrypter {
  constructor(
    private jwtService: JwtService,
    private refreshToken: RefreshTokenService,
  ) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(
    payload: Record<string, unknown>,
  ): Promise<string> {
    return this.refreshToken.generateRefreshToken(payload);
  }
}
