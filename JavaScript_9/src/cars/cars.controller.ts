import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';

/** Эндпоинт для работы с автомобилями */
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  /** Создать автомобиль */
  @Post()
  create(@Body() car: ICar): ICar | NotFoundException {
    return this.carsService.create(car);
  }

  /** Получить полный список авто */
  @Get()
  getAll(): ICar[] {
    return this.carsService.getAll();
  }

  /** Получить автомобиль по id*/
  @Get(':id')
  getOnebyId(@Param('id') id: string): ICar | NotFoundException {
    return this.carsService.getOneById(id);
  }

  /** Обновить автомобиль по id*/
  @Patch(':id')
  update(@Param('id') id: string, @Body() car: ICar): ICar | NotFoundException {
    return this.carsService.update(id, car);
  }

  /** Удалить автомобиль по id*/
  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.carsService.remove(id);
  }
}
