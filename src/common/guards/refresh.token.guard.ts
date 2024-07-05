import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../features/users/infrastructure/user.repository';
import { JwtService } from '@nestjs/jwt';
//import { ConfigService } from '@nestjs/config';
//import { JwtService } from '../../base/adapters/auth/jwt.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  //private readonly _secretKey: string;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService, //private readonly configService: ConfigService,
  ) {
    //this._secretKey = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.refreshToken;
    //console.log('Refresh token ', refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is expired');
    }
    let tokenPayload;
    try {
      tokenPayload = await this.jwtService.verify(refreshToken);
    } catch (error) {
      console.error('Token verification failed', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
    //console.log('Token payload:', tokenPayload);
    /*if (!tokenPayload) {
      throw new UnauthorizedException('Not authorized in cookie');
    }*/
    //console.log('Token Data:', tokenPayload.payload.sub);
    const user = await this.userRepository.find(tokenPayload.payload.sub);
    //console.log('User in db: ', user);
    if (!user) {
      throw new UnauthorizedException('Not authorized user not found');
    }
    // Добавляем userId в Request
    request.user = { id: tokenPayload.payload.sub };
    request.deviceId = tokenPayload.deviceId;
    return true;
    //Tested with postman good work
  }
}
