import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SecurityRepository } from '../infrastructure/security.repository';
import { JwtService } from '@nestjs/jwt';
import { Session } from '../domain/security.entity';

@Injectable()
export class SecurityService {
  constructor(
    private readonly jwtService: JwtService,
    //private readonly configService:ConfigService,
    private readonly securityRepository: SecurityRepository,
  ) {}

  async createAuthSession(
    refreshToken: string,
    userId: string,
    deviceName: string,
    ip: string,
  ) {
    const tokenData = await this.jwtService.decode(refreshToken);
    const dto: Session = {
      userId,
      deviceId: tokenData.deviceId,
      deviceName,
      ip,
      createdAt: tokenData.iat,
      expirationDate: tokenData.exp,
    };
    const newSession = new Session(dto);
    await this.securityRepository.createSession(newSession);
  }
  async checkAuthSessionByRefreshToken(refreshToken: string) {
    const tokenData = await this.jwtService.decode(refreshToken);
    /*if(!tokenData){
            throw new UnauthorizedException('Invalid refresh token')
        }*/
    const authSession = await this.securityRepository.findSession(
      tokenData.userId,
      tokenData.deviceId,
      tokenData.iat,
    );
    /*if (!authSession) {
            throw new UnauthorizedException('Invalid session');
        }*/
    return authSession;
  }

  async terminateAllOtherSessions(
    currentDeviceId: string,
    refreshToken: string,
  ) {
    const tokenData = await this.jwtService.decode(refreshToken);
    try {
      // Получаем идентификаторы устройств пользователя
      const userDeviceIds = await this.securityRepository.findDeviceIds(
        tokenData.userId,
      );
      userDeviceIds.delete(currentDeviceId);
      if (userDeviceIds.size === 0) {
        return;
      }
      await this.securityRepository.terminateAllOtherSessions(
        Array.from(userDeviceIds),
      );
    } catch (error) {
      console.error('Error deleting other sessions:', error);
      throw new InternalServerErrorException('Error deleting other sessions');
    }
  }

  async terminateSessionById(deviceId: string) {
    return this.securityRepository.terminateSessionById(deviceId);
  }
}
