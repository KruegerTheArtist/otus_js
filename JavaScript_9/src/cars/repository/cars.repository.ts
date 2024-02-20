import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from '../interfaces/car.interface';
import { randomUUID } from 'crypto';

/** Репозиторий для работы с коллекцией автомобилей */
@Injectable()
export class CarsRepository {
  private _cars: ICar[] = [
    {
      id: randomUUID(),
      model: 'Jeep',
      brand: '',
      // assemblyDate: new Date('01.01.2005'),
    },
    {
      id: randomUUID(),
      model: 'Hatchback',
      brand: '',
      // assemblyDate: new Date('01.01.20010'),
    },
    {
      id: randomUUID(),
      model: 'Sedan',
      brand: '',
      // assemblyDate: new Date('01.01.2011'),
    },
    {
      id: randomUUID(),
      model: 'Minivan',
      brand: '',
      // assemblyDate: new Date('01.01.2020'),
    },
  ];

  /** Получить полный список автомобилей */
  getAllCars(): ICar[] {
    return this._cars;
  }

  /** Получить автомобиль по идентификатору */
  getCarById(id: string): ICar | undefined {
    return this._cars.find((c) => c.id === id);
  }

  /** Создать новый автомобиль */
  createCar(car: ICar): ICar {
    const newCar = {
      id: randomUUID(),
      ...car,
    };
    this._cars.push(newCar);
    return newCar;
  }

  /** Обновить автомобиль */
  updateCar(id: string, car: ICar): ICar | NotFoundException {
    const carIndex = this._cars.findIndex((c) => c.id === id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
    this._cars[carIndex] = {
      ...this._cars[carIndex],
      ...car,
    };
    return this._cars[carIndex];
  }

  /** Удалить автомобиль */
  deleteCar(id: string): void | NotFoundException {
    const carIndex = this._cars.findIndex((c) => c.id === id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
    this._cars = this._cars.filter((c) => c.id !== id);
  }
}
