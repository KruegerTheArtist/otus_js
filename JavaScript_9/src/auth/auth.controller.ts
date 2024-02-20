import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserSignIn } from 'src/users/interfaces/requests/user-sign-in.interface';
import { ILoginResponse } from './interfaces/login-response.interface';
import { LocalAuthGuard } from './local-auth.guard';

/** Эндпоинт авторизации */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Логин пользователя
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: IUserSignIn): Promise<ILoginResponse> {
    return this.authService.login(user);
  }

  // Метод регистрации пользователя
  @Post('register')
  async register(
    @Body() user: IUserSignIn,
  ): Promise<Omit<IUserSignIn, 'password'> | BadRequestException> {
    return this.authService.register(user);
  }
}
