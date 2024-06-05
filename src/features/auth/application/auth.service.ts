import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {UserRepository} from "../../users/infrastructure/user.repository";
import {LoginInputDto} from "../api/models/input/create-auth.input.model";
import {BcryptService} from "../../../base/adapters/auth/bcrypt.service";
import {JwtService} from "../../../base/adapters/auth/jwt.service";
import {UserCreateDto} from "../../users/api/models/input/create-user.input.model";
import {UsersService} from "../../users/application/users.service";


@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository,
                private readonly userService: UsersService,
                private readonly bcryptService: BcryptService,
                private readonly jwtService: JwtService) {
    }

    async loginUser(dto: LoginInputDto) {
        const user = await this.userRepository.findByLoginOrEmail(dto.loginOrEmail)
        if (!user) {
            throw new UnauthorizedException('Incorrect login or email')
        }
        const isCorrectPassword = await this.bcryptService.checkPassword(dto.password, user.passwordHash)
        if (!isCorrectPassword) {
            throw new UnauthorizedException('Incorrect password')
        }
        //Создаем токены
        const {accessToken, refreshToken} = await this.jwtService.createPairToken(user._id.toString())
        if (!accessToken || !refreshToken) {
            throw new UnauthorizedException('Token not created')
        }
        return {accessToken, refreshToken}
    }

    async registerUser(dto: UserCreateDto) {
        try {
            const userId = await this.userService.create(dto)
            const createdUser = await this.userRepository.find(userId)

        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }
}