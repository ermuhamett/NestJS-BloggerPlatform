import {
    IsOptionalEmail,
    IsOptionalString,
    IsStringLength
} from "../../../../../common/decorators/validate/is-optional-email";


export class LoginInputDto{
    @IsOptionalString() //custom декораторы
    loginOrEmail:string;

    @IsOptionalString()
    password:string;
}

export class PasswordRecoveryDto{
    @IsOptionalEmail()
    email:string
}

export class NewPasswordDto{
    @IsStringLength(6,20)
    newPassword:string

    @IsOptionalString()
    recoveryCode:string
}

export class ConfirmationCodeDto{
    @IsOptionalString()
    code:string
}