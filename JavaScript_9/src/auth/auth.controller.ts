import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { IUser } from 'src/users/interfaces/user.interface';

/** Эндпоинт авторизации */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Логин пользователя
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Метод регистрации пользователя
  @Post('register')
  async register(@Body() user: IUser) {
    return this.authService.register(user);
  }
}
