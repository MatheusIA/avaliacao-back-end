import { InvalidToken } from "@/entities/tokens/invalid-token.entity";

export abstract class InvalidTokenRepository {
  abstract create(token: InvalidToken): Promise<void>;
}
