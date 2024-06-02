import { IsString, Length } from 'class-validator';
import { Trim } from '../../../../../common/decorators/transform/trim';
import { IsOptionalEmail } from '../../../../../common/decorators/validate/is-optional-email';

export class UserCreateDto {
  //@Trim()
  //@IsString()
  //@Length(5, 20, { message: 'Length not correct' })
  login: string;
  password:string
  //@IsOptionalEmail()
  email: string;
}
