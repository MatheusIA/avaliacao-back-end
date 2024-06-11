import { FetchUserUseCase } from "@/domain/application/use-cases/fetch-user";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/fetchUser")
export class FetchUserController {
  constructor(private fetchUser: FetchUserUseCase) {}

  @Get()
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
