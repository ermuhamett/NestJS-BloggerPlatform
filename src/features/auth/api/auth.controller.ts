import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {LoginInputDto} from "./models/input/create-auth.input.model";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor() {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUser(@Body() loginDto:LoginInputDto){

    }

    @Post('password-recovery')
    @HttpCode(HttpStatus.NO_CONTENT)
    async passwordRecovery(){}

    @Post('new-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async newPassword(){

    }

    @Post('registration-confirmation')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registrationConfirmation(){}

    @Post('registration')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registration(){}

    @Post('registration-email-resending')
    @HttpCode(HttpStatus.NO_CONTENT)
    async registrationEmailResending(){}

    @Get('me')
    @HttpCode(HttpStatus.OK)
    async currentUser(){}
}