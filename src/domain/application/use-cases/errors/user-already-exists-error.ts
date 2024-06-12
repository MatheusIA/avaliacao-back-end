import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super("CPF Invalid", HttpStatus.CONFLICT);
  }
}
