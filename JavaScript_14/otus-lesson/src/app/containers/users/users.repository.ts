import { Injectable } from '@angular/core';
import { DEFAULT_ROLES } from 'app/shared/constants/default-roles';
import { USERS_KEY, StoreService } from '../../shared/services/store.service';
import { IUser } from '../../shared/interfaces/user.interface';

/** Репозиторий для работы с пользователями */
@Injectable()
export class UsersRepository {
  users: IUser[] = [
    { id: 0, login: 'admin', password: 'admin', roles: [DEFAULT_ROLES[0].id] },
  ];

  constructor(private _storeService: StoreService) {
    this._initData();
  }

  /** Получить всех пользователей */
  getAll() {
    return this.users;
  }

  /** Получить одного пользователя по логину */
  getOneByLogin(login: string) {
    return this.users.find((x) => x.login === login);
  }

  /** Получить одного пользователя */
  getOne(login: string, password: string) {
    return this.users.find((x) => x.login === login && x.password === password);
  }

  /**
   *
   */
  update(user: IUser): void {
    const index = this.users.findIndex((x) => x.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this._storeService.set(USERS_KEY, this.users);
    }
    this._initData();
  }

  /** Удалить пользователя */
  delete(user: IUser): void {
    const arrayWithoutUser = this.users.filter((x) => x.id !== user.id);
    this._storeService.set<IUser[]>(USERS_KEY, arrayWithoutUser);
    this._initData();
  }

  /** Добавить пользователя */
  add(user: IUser): IUser {
    const findedIndex = this.users.findIndex((x) => x.login === user.login);
    if (findedIndex === -1) {
      user.id = Math.floor(Math.random() * 99999);
      this.users.push(user);
      this._storeService.set(USERS_KEY, this.users);
    }
    this._initData();
    return user;
  }

  /** Инициализировать данные */
  private _initData(): void {
    const user = this._storeService.get<IUser[]>(USERS_KEY);
    if (user) {
      this.users = user;
    }
  }
}
