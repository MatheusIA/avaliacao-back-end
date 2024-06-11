import { InvalidTokenRepository } from "@/domain/application/repositories/invalid-token-repository";
import { InvalidToken } from "@/entities/tokens/invalid-token.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeORMInvalidToken implements InvalidTokenRepository {
  constructor(
    @InjectRepository(InvalidToken)
    private readonly ormRepository: Repository<InvalidToken>,
  ) {}

  async create(token: InvalidToken): Promise<void> {
    await this.ormRepository.save(token);
  }
}
