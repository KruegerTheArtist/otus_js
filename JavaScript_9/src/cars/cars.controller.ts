import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CarCreateRequest } from './interfaces/requests/car-create-request.type';
import { Car } from 'src/shared/entities/car.entity';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

/** Эндпоинт для работы с автомобилями */
@Controller('cars')
@ApiTags('Cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  /** Создать автомобиль */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() car: CarCreateRequest,
  ): Promise<ICar | NotFoundException> {
    return this.carsService.create(car);
  }

  /** Получить полный список авто */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<ICar[]> {
    return this.carsService.getAll();
  }

  /** Получить автомобиль по id*/
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOnebyId(@Param('id') id: string): Promise<Car | NotFoundException> {
    return this.carsService.getOneById(id);
  }

  /** Обновить автомобиль по id*/
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() car: ICar,
  ): Promise<Car | NotFoundException> {
    return this.carsService.update(id, car);
  }

  /** Удалить автомобиль по id*/
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.carsService.remove(id);
  }
}
