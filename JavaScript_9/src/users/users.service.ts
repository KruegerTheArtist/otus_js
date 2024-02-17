import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { IUser } from './interfaces/user.interface';

/** Сервис для работы с пользователями */
@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  /** Создать нового пользователя */
  create(user: IUser): IUser | NotFoundException {
    const newUser = this.repository.createOne(user);
    return newUser;
  }

  /** Получить пользователя по userName */
  getOneByUsername(username: string): IUser | NotFoundException {
    const car = this.repository.getOneByUsername(username);
    if (!car) {
      throw new NotFoundException(`User with user name:${username} not found`);
    }
    return car;
  }
}
