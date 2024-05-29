import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/user.repository';

// Для провайдера всегда необходимо применять декоратор @Injectable() и регистрировать в модуле
@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async create(email: string, name: string) {
    // email send message
    // this.emailAdapter.send(message);

    return 'id';
  }
}
