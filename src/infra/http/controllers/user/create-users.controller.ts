import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { Public } from "@/infra/auth/public";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "@/infra/dto/create-user.dto";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  CPF: z.string(),
  active: z.boolean(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@ApiTags("users")
@Controller("/users")
@Public()
export class CreateUsersController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created",
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 409,
    description: "CPF Invalid",
  })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async create(@Body() body: CreateUserBodySchema) {
    const { name, email, password, CPF, active } = body;

    const result = await this.registerUser.execute({
      name,
      email,
      password,
      CPF,
      active,
    });

    return {
      result,
    };
  }
}
