import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  CPF: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("users")
export class CreateUsersController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async create(@Body() body: CreateUserBodySchema) {
    const { name, email, password, CPF } = body;

    const result = await this.registerUser.execute({
      name,
      email,
      password,
      CPF,
    });

    return {
      result,
    };
  }
}
