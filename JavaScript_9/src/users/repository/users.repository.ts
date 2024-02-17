import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';
import { randomUUID } from 'crypto';

/** Репозиторий для работы с коллекцией пользователей */
@Injectable()
export class UsersRepository {
  private _users: IUser[] = [];

  createOne(user: IUser): IUser {
    const newUser: IUser = {
      id: randomUUID(),
      ...user,
    };
    this._users.push(newUser);
    return user;
  }

  /** Получить юзера по userName */
  getOneByUsername(username: string): IUser | NotFoundException {
    const findedUser = this._users.find((x) => x.username === username);
    if (!findedUser) {
      throw new NotFoundException(`User with user name: ${username} not found`);
    }
    return findedUser;
  }
}
