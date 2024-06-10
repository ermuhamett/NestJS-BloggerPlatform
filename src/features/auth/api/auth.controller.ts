import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ConfirmationCodeDto,
  LoginInputDto,
  NewPasswordDto,
  PasswordRecoveryDto,
  RegistrationEmailResendingDto,
} from './models/input/create-auth.input.model';
import { AuthService } from '../application/auth.service';
import { Response } from 'express';
import { UserCreateDto } from '../../users/api/models/input/create-user.input.model';
import { AuthGuard } from '@nestjs/passport';
import { UserQueryRepository } from '../../users/infrastructure/user.query.repository';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(ThrottlerGuard) // Применение на уровне контроллера
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  @SkipThrottle()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() loginDto: LoginInputDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.loginUser(loginDto);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: tokens.accessToken }; //done,tested
  }

  @Post('password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  async passwordRecovery(@Body() passwordRecoveryDto: PasswordRecoveryDto) {
    return await this.authService.passwordRecovery(passwordRecoveryDto.email); //done, not tested
  }

  @Post('new-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async newPassword(@Body() newPasswordDto: NewPasswordDto) {
    return await this.authService.newUserPassword(
      newPasswordDto.newPassword,
      newPasswordDto.recoveryCode,
    ); //done, not tested
  }

  @Post('registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationConfirmation(@Body() confirmationDto: ConfirmationCodeDto) {
    return await this.authService.confirmUser(confirmationDto.code); //done, not tested
  }

  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registration(@Body() userCreateDto: UserCreateDto) {
    return await this.authService.registerUser(userCreateDto); //done, worked
  }

  @Post('registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationEmailResending(
    @Body() resendingDto: RegistrationEmailResendingDto,
  ) {
    return await this.authService.resendingEmail(resendingDto.email);
  }

  @SkipThrottle()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async currentUser(@Request() req) {
    const user = await this.userQueryRepository.getUserById(req.user.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email: user.email,
      login: user.login,
      userId: user.id.toString(),
    }; //done worked
  }
}
