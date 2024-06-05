import {Module} from "@nestjs/common";
import {BasicStrategy} from "../../../common/strategies/basic.strategy";
import {AuthController} from "./auth.controller";
import {BcryptService} from "../../../base/adapters/auth/bcrypt.service";
import {AuthService} from "../application/auth.service";
import {UsersService} from "../../users/application/users.service";

@Module({
    imports:[UsersService],
    providers:[BasicStrategy, BcryptService, AuthService],
    controllers:[AuthController],

})

export class AuthModule{}