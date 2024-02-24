import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CarsRepository } from './repository/cars.repository';
import { ICar } from './interfaces/car.interface';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService, CarsRepository],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all cars', () => {
    //Arrange
    //Act
    const allCars = controller.getAll();
    //Assert
    expect(controller).toBeDefined();
    expect(allCars?.length).toEqual(4);
  });

  it('should create new car', () => {
    //Arrange
    const newCar: ICar = {
      model: 'testModel',
      assemblyDate: new Date(),
    };
    //Act
    controller.create(newCar);
    const allCarsAfterCreate = controller.getAll();
    //Assert
    expect(controller).toBeDefined();
    expect(allCarsAfterCreate.length).toEqual(5);
    expect(
      allCarsAfterCreate.findIndex((c) => c.model === newCar.model) > -1,
    ).toBeTruthy();
  });

  it('should update car', () => {
    //Arrange
    const newCar: ICar = {
      id: controller.getAll()[0].id,
      model: 'testModel',
      assemblyDate: new Date(),
    };
    //Act
    controller.update(newCar.id, newCar);
    const allCarsAfterCreate = controller.getAll();
    //Assert
    expect(controller).toBeDefined();
    expect(allCarsAfterCreate.find((c) => c.id === newCar.id)).toEqual(newCar);
  });

  it('should remove car', () => {
    //Arrange
    const firstCar = controller.getAll()[0]?.id;
    //Act
    controller.remove(firstCar);
    const allCarsAfterCreate = controller.getAll();
    //Assert
    expect(controller).toBeDefined();
    expect(allCarsAfterCreate.length).toEqual(3);
  });
});
