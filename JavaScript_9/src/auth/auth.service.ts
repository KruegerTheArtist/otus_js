import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { ILoginResponse } from './interfaces/login-response.interface';

/** Сервис для работы с авторизацией */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** Провалидировать пользователя перед логином */
  async validateUser(
    username: string,
    userPassword: string,
  ): Promise<Omit<IUser, 'password'>> | null {
    const user = await this.usersService.getOneByUsername(username);

    if (user && userPassword == (user as IUser).password) {
      const { password, ...result } = user as IUser;
      return result;
    }
    return null;
  }

  /** Логин пользователя */
  async login(user: IUser): Promise<ILoginResponse> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    } as ILoginResponse;
  }

  /** Регистрация пользователя */
  async register(user: IUser): Promise<IUser | NotFoundException> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.create({
      username: user.username,
      password: hashedPassword,
    });
  }
}
