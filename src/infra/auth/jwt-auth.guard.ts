import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UseFilters,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "./public";
import { TokenService } from "@/entities/tokens/invalid-token.service";
import { InvalidTokenExceptionFilter } from "@/domain/application/use-cases/errors/invalid-token-exception.filter";

@Injectable()
@UseFilters(InvalidTokenExceptionFilter)
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    if (token) {
      const isInvalid = await this.tokenService.isTokenInvalid(token);
      if (isInvalid) {
        throw new ForbiddenException("Invalid Token");
      }
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
