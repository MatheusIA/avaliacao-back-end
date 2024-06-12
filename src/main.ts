import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Documentação com Swagger - Avaliação Back End")
    .setDescription(
      `Recursos Disponivies:
        Usuário: Criação, Atualização, Deleção e Listar os usuários disponiveis.
        Autenticação: Autenticação feita através de JWT Token.
        Refresh Token,
        Logout do sistema
      `,
    )
    .setVersion("1.0")
    .addTag("Authenticate")
    .addTag("Logout")
    .addTag("Refresh_Token")
    .addTag("Users")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  await app.listen(port);
}
bootstrap();
