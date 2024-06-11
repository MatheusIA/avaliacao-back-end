import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { Module } from "@nestjs/common";
import { TypeORMUsersRepository } from "./repositories/typeORM-users-repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user/user.entity";
import { InvalidToken } from "@/entities/tokens/invalid-token.entity";
import { InvalidTokenRepository } from "@/domain/application/repositories/invalid-token-repository";
import { TypeORMInvalidToken } from "./repositories/typeORM-invalid-token-repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([InvalidToken]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: TypeORMUsersRepository,
    },
    {
      provide: InvalidTokenRepository,
      useClass: TypeORMInvalidToken,
    },
  ],
  exports: [UsersRepository, InvalidTokenRepository],
})
export class DatabaseModule {}
