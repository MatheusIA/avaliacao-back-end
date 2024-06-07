import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super("User with this CPF already exists", HttpStatus.CONFLICT);
  }
}
