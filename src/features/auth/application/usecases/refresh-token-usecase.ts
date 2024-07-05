import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../users/infrastructure/user.repository';
import { SecurityService } from '../../../security/application/security.service';
import { JwtService } from '../../../../base/adapters/auth/jwt.service';
import { UnauthorizedException } from '@nestjs/common';

export class RefreshTokenCommand {
  constructor(
    //public readonly refreshToken: string,
    public readonly userId: string,
    public readonly deviceId: string,
  ) {}
}

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenUseCase
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly securityService: SecurityService,
  ) {}

  async execute(command: RefreshTokenCommand) {
    const { userId, deviceId } = command;
    // Генерируем новую пару токенов
    const { accessToken, refreshToken } = await this.jwtService.createPairToken(
      userId,
      deviceId,
    );
    console.log('RefreshToken usecase accessToken: ', accessToken);
    console.log('RefreshToken usecase accessToken: ', refreshToken);
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Token not created');
    }
    const newRefreshTokenData = await this.jwtService.decodeToken(refreshToken);
    console.log('NewRefreshTokenData:', newRefreshTokenData);
    const lastActiveData = newRefreshTokenData.iat;
    await this.securityService.updateAuthSession(
      userId,
      deviceId,
      lastActiveData,
    );
    return { accessToken, refreshToken };
  }
}
