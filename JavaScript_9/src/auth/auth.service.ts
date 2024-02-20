import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { ILoginResponse } from './interfaces/login-response.interface';
import {
  IUserSignIn,
  IUserSignIn as IUserSignInRequest,
} from '../users/interfaces/requests/user-sign-in.interface';

/** Сервис для работы с авторизацией */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** Провалидировать пользователя перед логином */
  async validateUser(
    user: IUserSignInRequest,
  ): Promise<Omit<IUserSignInRequest, 'password'>> | null {
    const findedUser = await this.usersService.getOneByLogin(user.login);

    if (
      findedUser &&
      user.password == (findedUser as unknown as IUser).password
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user as IUserSignInRequest;
      return result;
    }
    return null;
  }

  /** Логин пользователя */
  async login(user: IUserSignInRequest): Promise<ILoginResponse> {
    console.log('user ', user);

    const payload = { login: user.login };
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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await this.usersService.create(user);
  }
}
