import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserSignIn } from 'src/users/interfaces/requests/user-sign-in.interface';
import { ILoginResponse } from './interfaces/login-response.interface';

/** Эндпоинт авторизации */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Логин пользователя
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
