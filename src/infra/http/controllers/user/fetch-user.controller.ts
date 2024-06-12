import { FetchUserUseCase } from "@/domain/application/use-cases/fetch-user";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { FetchUserDto } from "@/infra/dto/fetch-use.dto";
import { Controller, Get, HttpCode } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("users")
@Controller("/fetchUser")
@ApiBearerAuth()
export class FetchUserController {
  constructor(private fetchUser: FetchUserUseCase) {}

  @Get()
  @ApiOperation({ summary: "Fetch the user" })
  @ApiResponse({
    status: 200,
    type: FetchUserDto,
  })
  @HttpCode(200)
  async fetch(
    @CurrentUser()
    user: UserPayload,
  ) {
    const id = user.sub;

    const result = await this.fetchUser.execute({
      id,
    });

    return {
      result,
    };
  }
}
