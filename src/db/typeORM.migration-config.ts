import { DataSource } from "typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

import * as path from "path";
import { envSchema } from "../env";

// Inicializa o módulo de configuração para carregar as variáveis de ambiente
ConfigModule.forRoot({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
});

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  url: configService.get<string>("DATABASE_URL"),
  synchronize: false,
  entities: [path.resolve(__dirname, "../entities/**/*.entity{.js,.ts}")],
  migrations: ["dist/migration/*.js"],
  logging: true,
  schema: "public",
});
