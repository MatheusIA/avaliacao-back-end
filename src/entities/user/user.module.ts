import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersService } from "./user.service";
import { CreateUsersController } from "@/infra/http/controllers/user/create-users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [CreateUsersController],
})
export class UserModule {}
