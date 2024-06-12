// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { SecondaryDatabaseService } from "./secondary-database.service";

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       name: "superhero",
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: "postgres",
//         url: configService.get<string>("SUPERHERO_DATABASE_URL"),
//         synchronize: false,
//         entities: [],
//         logging: true,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [SecondaryDatabaseService],
//   exports: [SecondaryDatabaseService],
// })
// export class SecondaryDatabaseModule {}
