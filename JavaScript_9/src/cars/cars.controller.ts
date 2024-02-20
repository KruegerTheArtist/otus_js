import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';
import { UsersService } from 'src/users/users.service';

/** Эндпоинт для работы с автомобилями */
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private usersService: UsersService,
  ) {}

  /** Создать автомобиль */
  @Post()
  async create(@Body() car: ICar): Promise<ICar | NotFoundException> {
    return this.carsService.create(car);
  }

  /** Получить полный список авто */
  // @UseGuards(LocalAuthGuard)
  @Get()
  async getAll(): Promise<ICar[]> {
    this.usersService.createAndAssignRandomCar({
      login: 'Teeeest',
      password: '',
      email: '2',
      name: '241',
    });
    return this.carsService.getAll();
  }

  // /** Получить автомобиль по id*/
  // @Get(':id')
  // getOnebyId(@Param('id') id: string): ICar | NotFoundException {
  //   return this.carsService.getOneById(id);
  // }

  // /** Обновить автомобиль по id*/
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() car: ICar): ICar | NotFoundException {
  //   return this.carsService.update(id, car);
  // }

  // /** Удалить автомобиль по id*/
  // @Delete(':id')
  // remove(@Param('id') id: string): void {
  //   return this.carsService.remove(id);
  // }
}
