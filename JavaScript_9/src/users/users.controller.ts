import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  /** Проставить рандомную машину мечты для пользователя */
  @UseGuards(LocalAuthGuard)
  @Post('assignRandomDreamCar/:id')
  assignRandomDreamCar(@Param('id') id: string): void | NotFoundException {
    this._usersService.assignCarForUserDream(id);
  }

  /** Проставить рандомную машину мечты по его бренду для пользователя */
  @UseGuards(LocalAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: IUser,
  ): Promise<NotFoundException | IUser> {
    return this._usersService.update(id, user);
  }
}
