import { Module } from "@nestjs/common";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { CreateUsersController } from "./controllers/create-users.controller";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUsersController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}
