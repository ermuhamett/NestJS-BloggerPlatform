import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {BcryptService} from "../../../base/adapters/auth/bcrypt.service";
import {AuthService} from "../application/auth.service";
import {EmailModule} from "../../../base/adapters/email/mailer.module";
import {JwtService} from "../../../base/adapters/auth/jwt.service";
import {UserModule} from "../../users/api/user.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "../../../common/strategies/jwt.strategy";

@Module({
    imports:[EmailModule, UserModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
            const secret = configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
            console.log('JWT_ACCESS_TOKEN_SECRET:', secret); // Временный вывод для проверки
            return {
                secret,
                signOptions: { expiresIn: '10m' },
            };
        },
        inject: [ConfigService],
    }),],//Сюда импортируются только модули
    providers:[JwtStrategy, BcryptService, AuthService, JwtService],//А сюда все остальное что через Injectable.Если они внутри module то импортировать только Module
    controllers:[AuthController],
})

export class AuthModule{}