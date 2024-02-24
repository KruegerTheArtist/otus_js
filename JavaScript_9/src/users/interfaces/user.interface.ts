/** Пользователь */
export interface IUser {
  /** Идентификатор пользователя */
  id?: string;
  /** Логин */
  login: string;
  /** Пароль */
  password: string;
  /** Имя */
  name: string;
  /** Электронная почта */
  email: string;
  /** Тип машины мечты */
  dreamCar?: 'Toyota' | 'Honda';
}
