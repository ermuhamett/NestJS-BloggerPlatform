import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../domain/user.entity";
import {BcryptModule} from "../../../base/adapters/auth/bcrypt.module";
import {UsersService} from "../application/users.service";
import {UserRepository} from "../infrastructure/user.repository";
import {UserQueryRepository} from "../infrastructure/user.query.repository";
import {UserController} from "./user.controller";


@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
        BcryptModule
    ],
    providers:[UsersService, UserRepository, UserQueryRepository],
    controllers:[UserController],
    exports:[UsersService],
})

export class UserModule{}