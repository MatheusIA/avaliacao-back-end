import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate-user";
import { Public } from "@/infra/auth/public";
import { AuthResponseDto } from "@/infra/dto/authentitica.dto";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email().optional(),
  password: z.string(),
  cpf: z.string().optional(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@ApiTags("authenticate")
@Controller("/sessions")
@Public()
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: "Authenticate" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", nullable: true },
        password: { type: "string" },
        cpf: { type: "string", nullable: true },
      },
      required: ["password"],
    },
    description: "Autenticar um usuário com email ou CPF e senha",
  })
  @ApiResponse({
    status: 200,
    description: "Autenticação bem-sucedida",
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: "Dados de solicitação inválidos" })
  @ApiResponse({ status: 401, description: "Credenciais inválidas" })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async authenticate(@Body() body: AuthenticateBodySchema) {
    const { email, password, cpf } = body;

    const { accessToken, refreshToken } = await this.authenticateUser.execute({
      email,
      password,
      cpf,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
