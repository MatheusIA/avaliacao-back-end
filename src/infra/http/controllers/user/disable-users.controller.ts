import { DisableUserUseCase } from "@/domain/application/use-cases/disable-user";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipes";
import { Body, Controller, Param, Patch, Req } from "@nestjs/common";
import { z } from "zod";
import { Request } from "express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DisabeUserDto } from "@/infra/dto/disable-user.dto";

const statusUserSchema = z.object({
  active: z.boolean(),
});

const validationPipe = new ZodValidationPipe(statusUserSchema);

type StatusUserSchema = z.infer<typeof statusUserSchema>;

@ApiTags("Users")
@Controller("/users/disable")
@ApiBearerAuth()
export class DisableUserController {
  constructor(private disableUserUseCase: DisableUserUseCase) {}

  @Patch(":id")
  @ApiOperation({ summary: "Disable the user" })
  @ApiParam({
    name: "id",
    description: "ID of the user to disable",
    type: Number,
    example: 123,
  })
  @ApiResponse({
    description: "The user has desable with successfully",
    type: DisabeUserDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        active: { type: "boolean" },
      },
      required: [" active"],
    },
  })
  async update(
    @Body(validationPipe) body: StatusUserSchema,
    @Param("id") id: number,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Token is missing");
    }
    const { active } = body;

    const result = await this.disableUserUseCase.execute({
      id,
      active,
      token,
    });

    return {
      result,
    };
  }
}
