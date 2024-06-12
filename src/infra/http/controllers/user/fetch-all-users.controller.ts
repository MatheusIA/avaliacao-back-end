import { FetchAllUserUseCase } from "@/domain/application/use-cases/fetch-all-users";
import { FetchUserDto } from "@/infra/dto/fetch-use.dto";
import { Controller, Get, HttpCode } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("/users/all")
@ApiBearerAuth()
export class FetchAllUserController {
  constructor(private fetchAllUser: FetchAllUserUseCase) {}

  @Get()
  @ApiOperation({ summary: "Fetch all users" })
  @ApiResponse({
    status: 200,
    type: [FetchUserDto],
  })
  @HttpCode(200)
  async fetchAll() {
    const result = await this.fetchAllUser.execute();

    return {
      result,
    };
  }
}
