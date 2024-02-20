import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all cars', async () => {
    //Arrange
    //Act
    const allCars = await service.getAll();
    //Assert
    expect(service).toBeDefined();
    expect(allCars?.length).toEqual(4);
  });

  it('should create new car', async () => {
    //Arrange
    const newCar: ICar = {
      model: 'testModel',
      brand: 'Honda',
    };
    //Act
    service.create(newCar);
    const allCarsAfterCreate = await service.getAll();
    //Assert
    expect(service).toBeDefined();
    expect(allCarsAfterCreate.length).toEqual(5);
    expect(
      allCarsAfterCreate.findIndex((c) => c.model === newCar.model) > -1,
    ).toBeTruthy();
  });

  // it('should update car', async () => {
  //   //Arrange
  //   const newCar: ICar = {
  //     id: service.getAll()[0].id,
  //     model: 'testModel',
  //     assemblyDate: new Date(),
  //   };
  //   //Act
  //   service.update(newCar.id, newCar);
  //   const allCarsAfterCreate = service.getAll();
  //   //Assert
  //   expect(service).toBeDefined();
  //   expect(allCarsAfterCreate.find((c) => c.id === newCar.id)).toEqual(newCar);
  // });

  // it('should remove car', async () => {
  //   //Arrange
  //   const firstCar = service.getAll()[0]?.id;
  //   //Act
  //   service.remove(firstCar);
  //   const allCarsAfterCreate = service.getAll();
  //   //Assert
  //   expect(service).toBeDefined();
  //   expect(allCarsAfterCreate.length).toEqual(3);
  // });
});
