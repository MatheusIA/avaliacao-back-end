import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InvalidToken } from "./invalid-token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(InvalidToken)
    private invalidTokenRepository: Repository<InvalidToken>,
  ) {}

  async invalidateToken(token: string) {
    const invalidToken = this.invalidTokenRepository.create({ token });
    await this.invalidTokenRepository.save(invalidToken);
  }

  async isTokenInvalid(token: string) {
    const invalidToken = await this.invalidTokenRepository.findOne({
      where: { token },
    });
    return !!invalidToken;
  }
}
