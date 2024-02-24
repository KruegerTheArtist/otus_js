import { Test, TestingModule } from '@nestjs/testing';
import { CarsRepository } from './cars.repository';
import { CarsController } from '../cars.controller';
import { CarsService } from '../cars.service';
import { ICar } from '../interfaces/car.interface';

describe('CarsRepository', () => {
  let repository: CarsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService, CarsRepository],
    }).compile();

    repository = module.get<CarsRepository>(CarsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should get all cars', () => {
    //Arrange
    //Act
    const allCars = repository.getAllCars();
    //Assert
    expect(repository).toBeDefined();
    expect(allCars?.length).toEqual(4);
  });

  it('should create new car', () => {
    //Arrange
    const newCar: ICar = {
      model: 'testModel',
      assemblyDate: new Date(),
    };
    //Act
    repository.createCar(newCar);
    const allCarsAfterCreate = repository.getAllCars();
    //Assert
    expect(repository).toBeDefined();
    expect(allCarsAfterCreate.length).toEqual(5);
    expect(
      allCarsAfterCreate.findIndex((c) => c.model === newCar.model) > -1,
    ).toBeTruthy();
  });

  it('should update car', () => {
    //Arrange
    const newCar: ICar = {
      id: repository.getAllCars()[0].id,
      model: 'testModel',
      assemblyDate: new Date(),
    };
    //Act
    repository.updateCar(newCar.id, newCar);
    const allCarsAfterCreate = repository.getAllCars();
    //Assert
    expect(repository).toBeDefined();
    expect(allCarsAfterCreate.find((c) => c.id === newCar.id)).toEqual(newCar);
  });

  it('should remove car', () => {
    //Arrange
    const firstCar = repository.getAllCars()[0]?.id;
    //Act
    repository.deleteCar(firstCar);
    const allCarsAfterCreate = repository.getAllCars();
    //Assert
    expect(repository).toBeDefined();
    expect(allCarsAfterCreate.length).toEqual(3);
  });
});
