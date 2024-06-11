import { EditUserUseCase } from "@/domain/application/use-cases/edit-user";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { Body, Controller, Param, Post } from "@nestjs/common";
import { z } from "zod";

const editUserSchema = z.object({
  // id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  CPF: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserSchema);

type EditUserSchema = z.infer<typeof editUserSchema>;

@Controller("/user/update/:id")
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @Post()
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
