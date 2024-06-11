import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class InvalidTokenExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === HttpStatus.FORBIDDEN) {
      response.status(status).json({
        statusCode: status,
        message: "Invalid token, access forbidden",
        error: "Forbidden",
      });
    } else {
      response.status(status).json(exception.getResponse());
    }
  }
}
