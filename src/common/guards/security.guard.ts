import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SecurityService } from '../../features/security/application/security.service';

//SecurityGuard: Проверяет наличие и валидность токена и добавляет authSession в запрос.
@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(private readonly securityService: SecurityService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Not found token in cookie');
    }
    const authSession =
      await this.securityService.checkAuthSessionByRefreshToken(refreshToken);
    if (!authSession) {
      throw new UnauthorizedException('Auth Session not exist by this token');
    }
    request.authSession = authSession;
    return true;
  }
}
