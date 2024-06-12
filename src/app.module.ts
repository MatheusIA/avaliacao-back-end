/* eslint-disable n/no-path-concat */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { envSchema } from "./env";
import { HttpModule } from "./infra/http/http.module";
import { AuthModule } from "./infra/auth/auth.module";
import { DatabaseModule } from "./infra/database/database.module";
import { MongooseModule } from "@nestjs/mongoose";
// import { SecondaryDatabaseModule } from "./secondary-database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("DATABASE_URL"),
        synchronize: true,
        entities: [__dirname + "/entities/**/*.entity{.js,.ts}"],
        migrations: ["dist/migration/*.js"],
        logging: true,
        schema: "public",
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   name: "superhero",
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: "postgres",
    //     url: configService.get<string>("SUPERHERO_DATABASE_URL"),
    //     synchronize: false,
    //     entities: [],
    //     logging: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(
      "mongodb+srv://userroot:ibt3rH8aiugLMBdC@cluster0.ksgmxxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    ),
    AuthModule,
    HttpModule,
    DatabaseModule,
    // SecondaryDatabaseModule,
  ],
})
export class AppModule {}
