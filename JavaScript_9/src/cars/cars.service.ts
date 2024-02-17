import { Injectable, NotFoundException } from '@nestjs/common';
import { CarsRepository } from './repository/cars.repository';
import { ICar } from './interfaces/car.interface';

/** Сервис для работы с автомобилями */
@Injectable()
export class CarsService {
  constructor(private readonly repository: CarsRepository) {}
  create(car: ICar): ICar | NotFoundException {
    const newCar = this.repository.createCar(car);
    return newCar;
  }

  /** Получить полный список авто */
  getAll(): ICar[] {
    return this.repository.getAllCars();
  }

  /** Получить один автомобиль по ID */
  getOneById(id: string): ICar | NotFoundException {
    const car = this.repository.getCarById(id);
    if (!car) {
      throw new NotFoundException(`Car with id:${id} not found`);
    }
    return car;
  }

  /** Обновить авто по ID */
  update(id: string, car: ICar): ICar | NotFoundException {
    const newCar = this.repository.updateCar(id, car);
    return newCar;
  }

  /** Удаление автомобиля из списка */
  remove(id: string): void {
    this.repository.deleteCar(id);
  }
}
