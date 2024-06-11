import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { HttpModule } from "./infra/http/http.module";
import { AuthModule } from "./infra/auth/auth.module";
import { DatabaseModule } from "./infra/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "docker",
      database: process.env.DB_NAME || "avaliable-nest",
      synchronize: true,
      // eslint-disable-next-line n/no-path-concat
      entities: [__dirname + "/entities/**/*.entity{.js,.ts}"],
      migrations: ["dist/migration/*.js"],
      logging: true,
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}
