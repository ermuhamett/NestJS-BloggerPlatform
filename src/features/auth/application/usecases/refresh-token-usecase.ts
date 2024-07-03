import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../users/infrastructure/user.repository';
import { SecurityService } from '../../../security/application/security.service';

export class RefreshTokenCommand {
  constructor() {}
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

  async execute(command: RefreshTokenCommand) {}
}
