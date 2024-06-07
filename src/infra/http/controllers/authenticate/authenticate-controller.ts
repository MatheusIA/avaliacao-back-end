import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";

// import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { JwtService } from "@nestjs/jwt";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // cpf: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async authenticate(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const token = this.jwt.sign({ sub: "user-id" });

    return token;
  }
}
