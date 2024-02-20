import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICar } from './interfaces/car.interface';
import { Car } from '../shared/entities/car.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BRANDS } from '../shared/constants/brands';
import { CarCreateRequest } from './interfaces/requests/car-create-request.type';

/** Сервис для работы с автомобилями */
@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly _carsRepository: Repository<Car>,
  ) {
    this._initCars();
  }

  /** Создать новую машшину */
  async create(car: CarCreateRequest): Promise<NotFoundException | Car> {
    const newCar = await this._carsRepository.save(car);
    return newCar;
  }

  /** Получить полный список авто */
  async getAll(): Promise<Car[]> {
    const cars = await this._carsRepository.find();
    return cars;
  }

  /** Получить один автомобиль по ID */
  async getOneById(id: string): Promise<Car | NotFoundException> {
    const car = await this._carsRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Car with id:${id} not found`);
    }
    return car;
  }

  /** Обновить авто по ID */
  async update(id: string, car: ICar): Promise<Car | NotFoundException> {
    const findedCar = await this._carsRepository.findOne({ where: { id } });
    if (!findedCar) {
      throw new NotFoundException(`Car with id:${id} not found`);
    }
    const updatedCar = await this._carsRepository.save({
      ...findedCar,
      ...car,
    });
    return updatedCar;
  }

  /** Удаление автомобиля из списка */
  async remove(id: string): Promise<DeleteResult> {
    const findedCar = await this._carsRepository.findOne({ where: { id } });
    if (!findedCar) {
      throw new NotFoundException(`Car with id:${id} not found`);
    }
    return await this._carsRepository.delete({ id });
  }

  /** Инициализировать */
  private _initCars(): void {
    this._carsRepository.find().then((cars) => {
      const carsArray: ICar[] = [];
      BRANDS.forEach((models: string[], brand: string) => {
        models.forEach((model) => {
          if (
            !cars.filter((c) => c.brand === brand && c.model === model).length
          ) {
            carsArray.push({ brand, model });
          }
        });
      });
      this._carsRepository.insert(carsArray);
    });
  }
}
