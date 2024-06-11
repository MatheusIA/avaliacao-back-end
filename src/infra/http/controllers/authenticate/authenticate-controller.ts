import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate-user";
import { Public } from "@/infra/auth/public";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";

// import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";

import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email().optional(),
  password: z.string(),
  cpf: z.string().optional(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
@Public()
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
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
