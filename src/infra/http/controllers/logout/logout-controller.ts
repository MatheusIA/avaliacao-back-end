import { LogoutUseCase } from "@/domain/application/use-cases/logout";
import { Controller, Post, Req } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Request } from "express";

@ApiTags("logout")
@Controller()
@ApiBearerAuth()
export class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  @Post("/logout")
  @ApiOperation({ summary: "Logout" })
  @ApiResponse({
    description: "Logout successful",
  })
  async logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Token is missing");
    }

    await this.logoutUseCase.execute({ token });

    return { message: "Logout successful" };
  }
}
