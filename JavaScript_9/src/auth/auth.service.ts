import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { ILoginResponse } from './interfaces/login-response.interface';
import {
  IUserSignIn,
  IUserSignIn as IUserSignInRequest,
} from '../users/interfaces/requests/user-sign-in.interface';
import { User } from 'src/shared/entities/user.entity';

/** Сервис для работы с авторизацией */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** Провалидировать пользователя перед логином */
  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password'>> | null {
    console.log(login, password);

    const findedUser = await this.usersService.getOneByLoginForAuth(login);

    if (findedUser && password == (findedUser as unknown as IUser).password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = findedUser as User;
      return result;
    }
    return null;
  }

  /** Логин пользователя */
  async login(user: IUserSignInRequest): Promise<ILoginResponse> {
    const payload = { login: user.login, sub: user.login };
    const loginResponse = {
      access_token: this.jwtService.sign(payload),
    };
    console.log(this.jwtService);

    return loginResponse as ILoginResponse;
  }

  /** Регистрация пользователя */
  async register(
    user: IUserSignInRequest,
  ): Promise<Omit<IUserSignIn, 'password'> | BadRequestException> {
    return await this.usersService.create(user);
  }
}
