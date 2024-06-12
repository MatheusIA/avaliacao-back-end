import { Module } from "@nestjs/common";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { CreateUsersController } from "./controllers/user/create-users.controller";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate/authenticate-controller";
import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate-user";
import { FetchUserController } from "./controllers/user/fetch-user.controller";
import { FetchUserUseCase } from "@/domain/application/use-cases/fetch-user";
import { EditUserController } from "./controllers/user/edit-users.controller";
import { EditUserUseCase } from "@/domain/application/use-cases/edit-user";
import { RefreshTokenController } from "./controllers/refreshToken/refresh-token-controller";
import { RefreshTokenUseCase } from "@/domain/application/use-cases/refresh-token";
import { LogoutController } from "./controllers/logout/logout-controller";
import { LogoutUseCase } from "@/domain/application/use-cases/logout";
import { InvalidTokenModule } from "@/entities/tokens/invalid-token.module";
import { DisableUserController } from "./controllers/user/disable-users.controller";
import { DisableUserUseCase } from "@/domain/application/use-cases/disable-user";
import { LogsModule } from "@/logs/logs.module";
import { FetchAllUserController } from "./controllers/user/fetch-all-users.controller";
import { FetchAllUserUseCase } from "@/domain/application/use-cases/fetch-all-users";
// import { SuperHeroController } from "./controllers/super-hero/super-hero.controller";

@Module({
  imports: [DatabaseModule, CryptographyModule, InvalidTokenModule, LogsModule],
  controllers: [
    CreateUsersController,
    AuthenticateController,
    FetchUserController,
    EditUserController,
    RefreshTokenController,
    LogoutController,
    DisableUserController,
    FetchAllUserController,
    // SuperHeroController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    FetchUserUseCase,
    EditUserUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    DisableUserUseCase,
    FetchAllUserUseCase,
  ],
})
export class HttpModule {}
