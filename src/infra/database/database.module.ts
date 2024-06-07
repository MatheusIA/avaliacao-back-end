import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { Module } from "@nestjs/common";
import { TypeORMUsersRepository } from "./repositories/typeORM-users-repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UsersRepository,
      useClass: TypeORMUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
