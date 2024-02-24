import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all cars', async () => {
    //Arrange
    //Act
    const allCars = await controller.getAll();
    //Assert
    expect(controller).toBeDefined();
    expect(allCars?.length).toEqual(4);
  });

  it('should create new car', async () => {
    //Arrange
    const newCar: ICar = {
      model: 'testModel',
      brand: 'Honda',
    };
    //Act
    controller.create(newCar);
    const allCarsAfterCreate = await controller.getAll();
    //Assert
    expect(controller).toBeDefined();
    expect(allCarsAfterCreate.length).toEqual(5);
    expect(
      allCarsAfterCreate.findIndex((c) => c.model === newCar.model) > -1,
    ).toBeTruthy();
  });

  // it('should update car', async () => {
  //   //Arrange
  //   const newCar: ICar = {
  //     id: controller.getAll()[0].id,
  //     model: 'testModel',
  //     brand: 'Honda',
  //   };
  //   //Act
  //   await controller.update(newCar.id, newCar);
  //   const allCarsAfterCreate = controller.getAll();
  //   //Assert
  //   expect(controller).toBeDefined();
  //   expect(allCarsAfterCreate.find((c) => c.id === newCar.id)).toEqual(newCar);
  // });

  // it('should remove car', () => {
  //   //Arrange
  //   const firstCar = controller.getAll()[0]?.id;
  //   //Act
  //   controller.remove(firstCar);
  //   const allCarsAfterCreate = controller.getAll();
  //   //Assert
  //   expect(controller).toBeDefined();
  //   expect(allCarsAfterCreate.length).toEqual(3);
  // });
});
