import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './interfaces/car.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../shared/entities/car.entity';
import { Repository } from 'typeorm';
import { BRANDS } from 'src/shared/constants/brands';

/** Сервис для работы с автомобилями */
@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {
    this._initCars();
  }
  async create(car: ICar): Promise<NotFoundException | Car> {
    const newCar = await this.carsRepository.save({
      brand: car.brand,
      model: car.model,
    });
    return newCar;
  }

  /** Получить полный список авто */
  async getAll(): Promise<Car[]> {
    const cars = await this.carsRepository.find();
    return cars;
  }

  // /** Получить один автомобиль по ID */
  // getOneById(id: string): ICar | NotFoundException {
  //   const car = this.repository.getCarById(id);
  //   if (!car) {
  //     throw new NotFoundException(`Car with id:${id} not found`);
  //   }
  //   return car;
  // }

  // /** Обновить авто по ID */
  // update(id: string, car: ICar): ICar | NotFoundException {
  //   const newCar = this.repository.updateCar(id, car);
  //   return newCar;
  // }

  // /** Удаление автомобиля из списка */
  // remove(id: string): void {
  //   this.repository.deleteCar(id);
  // }

  /** Инициализировать */
  private _initCars(): void {
    this.carsRepository.find().then((cars) => {
      const carsArray: ICar[] = [];
      BRANDS.forEach((models: string[], brand: string) => {
        models.forEach((model) => {
          if (cars.find((c) => c.brand !== brand && c.model !== model)) {
            carsArray.push({ brand, model });
          }
        });
      });
      this.carsRepository.insert(carsArray);
    });
  }
}
