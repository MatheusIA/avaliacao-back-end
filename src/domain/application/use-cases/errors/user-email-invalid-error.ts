import { HttpException, HttpStatus } from "@nestjs/common";

export class UserEmailInvalidError extends HttpException {
  constructor() {
    super("Email Invalid", HttpStatus.CONFLICT);
  }
}
