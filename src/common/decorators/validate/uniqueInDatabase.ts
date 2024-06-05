import {Injectable} from "@nestjs/common";
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../../features/users/domain/user.entity";

// Обязательна регистрация в ioc
@ValidatorConstraint({name:'IsUnique', async:true})
//: Декоратор @ValidatorConstraint
// используется для определения кастомного валидатора. Он принимает объект с
// настройками, в данном случае, указывается имя валидатора (UniqIsExist)
// и устанавливается асинхронный режим валидации.
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async validate(value: any, args: ValidationArguments) {
        const [property] = args.constraints;
        const count = await this.userModel.countDocuments({ [property]: value });
        return count === 0;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args?.property} ${args?.value} already exist`;
        //const [property] = args.constraints;
        //return `${property} already exists`;
    }
}
//Это фабричная функция, которая создает декоратор для использования кастомного
// валидатора. Она регистрирует кастомный валидатор с помощью registerDecorator
// из class-validator, указывая целевой объект, свойство, опции валидации и сам
// кастомный валидатор IsUniqueConstraint.
export function IsUnique(property?: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsUniqueConstraint,
        });
    };
}