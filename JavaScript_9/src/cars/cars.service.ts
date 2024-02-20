import { Injectable, NotFoundException } from '@nestjs/common';
import { CarsRepository } from './repository/cars.repository';
import { ICar } from './interfaces/car.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../shared/entities/car.entity';
import { Repository } from 'typeorm';
import { BRANDS } from 'src/shared/constants/brands';
// import { randomUUID } from 'crypto';

/** Сервис для работы с автомобилями */
@Injectable()
export class CarsService {
  constructor(
    private readonly repository: CarsRepository,
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {
    this._initCars();
  }
  create(car: ICar): ICar | NotFoundException {
    const newCar = this.repository.createCar(car);
    this.carsRepository.save({
      // id: randomUUID(),
      // assemblyDate: car.assemblyDate,
      model: car.model,
    });
    return newCar;
  }

  /** Получить полный список авто */
  getAll(): ICar[] {
    console.log(
      'carrr',
      // this.carsRepository.create({
      //   id: Math.ceil(Math.random() * 100),
      //   assemblyDate: new Date(),
      //   model: 'test',
      // }),
      this.carsRepository.find().then((x) => {
        console.log(x);
      }),
    );

    // this.carsRepository
    //   .save({
    //     id: randomUUID(),
    //     assemblyDate: new Date(),
    //     model: 'test',
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   });
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

  private _initCars(): void {
    const cars: ICar[] = [];
    BRANDS.forEach((models: string[], brand: string) => {
      models.forEach((model) => cars.push({ brand, model }));
    });
    this.carsRepository.insert(cars);
  }
}
