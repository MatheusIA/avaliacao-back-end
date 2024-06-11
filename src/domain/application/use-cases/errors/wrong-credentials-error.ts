import { HttpException, HttpStatus } from "@nestjs/common";

export class WrongCredentialsError extends HttpException {
  constructor() {
    super("Credentials are not valid", HttpStatus.UNAUTHORIZED);
  }
}
