import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserSignIn } from 'src/users/interfaces/requests/user-sign-in.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /** Провалидировать пользователя */
  async validate(
    user: IUserSignIn,
  ): Promise<Promise<Omit<IUserSignIn, 'password'>> | UnauthorizedException> {
    const validatedUser = await this.authService.validateUser(user);

    if (!validatedUser) {
      throw new UnauthorizedException();
    }
    return validatedUser;
  }
}
