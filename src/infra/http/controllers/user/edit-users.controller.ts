import { EditUserUseCase } from "@/domain/application/use-cases/edit-user";
import { UpdateUserDto } from "@/infra/dto/update-user.dto";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { Body, Controller, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { z } from "zod";

const editUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  CPF: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserSchema);

type EditUserSchema = z.infer<typeof editUserSchema>;

@ApiTags("Users")
@Controller("/user/update/:id")
@ApiBearerAuth()
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @Post()
  @ApiOperation({ summary: "Edit the user" })
  @ApiParam({
    name: "id",
    description: "ID of the user to edit",
    type: String,
    example: "123",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        CPF: { type: "string" },
      },
      required: ["name", "email", "password", "CPF"],
    },
    description: "Dados do usuário a serem atualizados",
  })
  @ApiResponse({
    type: UpdateUserDto,
  })
  async update(
    @Body(bodyValidationPipe) body: EditUserSchema,
    @Param("id") id: string,
  ) {
    const { name, email, CPF, password } = body;

    const result = await this.editUser.execute({
      id,
      name,
      email,
      CPF,
      password,
    });

    return {
      result,
    };
  }
}
