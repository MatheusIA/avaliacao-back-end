import { LogoutUseCase } from "@/domain/application/use-cases/logout";
import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller()
export class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  @Post("/logout")
  async logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Token is missing");
    }

    await this.logoutUseCase.execute({ token });

    return { message: "Logout successful" };
  }
}
