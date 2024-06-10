import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginInputDto } from '../../api/models/input/create-auth.input.model';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../users/infrastructure/user.repository';
import { BcryptService } from '../../../../base/adapters/auth/bcrypt.service';
import { JwtService } from '../../../../base/adapters/auth/jwt.service';

export class LoginCommand {
  constructor(public readonly dto: LoginInputDto) {}
}

@CommandHandler(LoginCommand)
export class LoginUserUseCase implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    const { dto } = command;
    const user = await this.userRepository.findByLoginOrEmail(dto.loginOrEmail);
    if (!user) {
      throw new UnauthorizedException('Incorrect login or email');
    }
    const isCorrectPassword = await this.bcryptService.checkPassword(
      dto.password,
      user.passwordHash,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Incorrect password');
    }
    //Создаем токены
    const { accessToken, refreshToken } = await this.jwtService.createPairToken(
      user._id.toString(),
    );
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Token not created');
    }
    return { accessToken, refreshToken };
  }
}
