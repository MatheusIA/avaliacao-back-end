import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvalidToken } from "./invalid-token.entity";
import { TokenService } from "./invalid-token.service";
import { LogoutController } from "@/infra/http/controllers/logout/logout-controller";
import { LogoutUseCase } from "@/domain/application/use-cases/logout";
import { LogsModule } from "@/logs/logs.module";

@Module({
  imports: [TypeOrmModule.forFeature([InvalidToken]), LogsModule],
  providers: [TokenService, LogoutUseCase],
  controllers: [LogoutController],
  exports: [TokenService, LogsModule],
})
export class InvalidTokenModule {}
