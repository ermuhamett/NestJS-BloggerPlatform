import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res} from "@nestjs/common";
import {LoginInputDto} from "./models/input/create-auth.input.model";
import {AuthService} from "../application/auth.service";
import {Request, Response} from 'express';
import {UserCreateDto} from "../../users/api/models/input/create-user.input.model";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUser(@Body() loginDto: LoginInputDto, @Res({passthrough: true}) res: Response) {
        const tokens = await this.authService.loginUser(loginDto)
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
        });
        return {accessToken:tokens.accessToken}
    }

    @Post('password-recovery')
    @HttpCode(HttpStatus.NO_CONTENT)
    async passwordRecovery() {

    }

    @Post('new-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async newPassword() {

    }

    @Post('registration-confirmation')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registrationConfirmation() {
    }

    @Post('registration')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registration(@Body() userCreateDto:UserCreateDto) {
        return await this.authService.
    }

    @Post('registration-email-resending')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registrationEmailResending() {
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    async currentUser() {
    }
}