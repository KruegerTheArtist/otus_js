import { Injectable } from '@angular/core';
import { USERS_KEY, StoreService } from '../../shared/services/store.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { UsersState } from 'app/shared/reducers/users.reducer';
import { Store } from '@ngrx/store';
import { usersCreate, usersDelete, usersUpdate } from 'app/shared/actions/users.actions';
import { Observable, map, take } from 'rxjs';

/** Репозиторий для работы с пользователями */
@Injectable()
export class UsersRepository {

  constructor(private _storeService: StoreService,
    private store : Store<{users: UsersState}>) {
  }

  /** Получить всех пользователей */
  getAll() {
    console.log(this.store.select('users'));
    
    return this.store.select('users');
  }

  /** Получить одного пользователя по логину */
  getOneByLogin(login: string) {
    return this.getAll().pipe(take(1),
    map((users) => users.users.find((x) => x.login === login)))
  }

  /** Получить одного пользователя */
  getOne(login: string, password: string) {
    return this.getAll().pipe(take(1),
    map((users) => users.users.find((x) => x.login === login && x.password === password)))
  }

  /**
   *
   */
  update(user: IUser): void {
    this.getAll().pipe(take(1)).subscribe((users) => {
      const index = users.users.findIndex((x) => x.id === user.id);
      if (index !== -1) {
        console.log('[...users.users, user]', [...users.users, user]);
        const newUsersArray = [...users.users.map((x) => x.id === user.id ? user : x)];
        this._storeService.set(USERS_KEY, newUsersArray);
        this.store.dispatch(usersUpdate(user))
      }
      // this._initData();
    })
  }

  /** Удалить пользователя */
  delete(user: IUser): void {
    this.getAll().pipe(take(1)).subscribe((users) => {
      const arrayWithoutUser = users.users.filter((x) => x.id !== user.id);
      this._storeService.set<IUser[]>(USERS_KEY, arrayWithoutUser);
      this.store.dispatch(usersDelete(user.id))
      // this._initData();
    })
  }

  /** Добавить пользователя */
  add(user: IUser): Observable<IUser> {
    return this.getAll().pipe(take(1), map((users) => this._addUser(users?.users, user)))
}

private _addUser(users:IUser[], user: IUser): IUser {
  const findedIndex = users.findIndex((x) => x.login === user.login);
  console.log('findedIndex', findedIndex, user);
  
if (findedIndex === -1) {
  user.id = Math.floor(Math.random() * 99999);
  console.log('users', user.id);
  // users.push(user);

  console.log('users', users);
  this.store.dispatch(usersCreate(user))
  this._storeService.set(USERS_KEY, [...users,user]);
}
// this._initData();
return user;

}

  // /** Инициализировать данные */
  // private _initData(): void {
  //   const user = this._storeService.get<IUser[]>(USERS_KEY);
  //   if (user) {
  //     this.users = user;
  //   }
  // }
}
