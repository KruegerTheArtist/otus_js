import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  /** Проставить рандомную машину мечты для пользователя */
  @Post('assignRandomDreamCar/:id')
  @UseGuards(JwtAuthGuard)
  assignRandomDreamCar(@Param('id') id: string): void | NotFoundException {
    this._usersService.assignCarForUserDream(id);
  }

  /** Обновить данные о пользователе */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: IUser,
  ): Promise<NotFoundException | IUser> {
    return this._usersService.update(id, user);
  }

  /** Проставить рандомную машину мечты по его бренду для пользователя */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this._usersService.delete(id);
  }
}
