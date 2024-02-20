import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from './interfaces/user.interface';
import { User } from '../shared/entities/user.entity';
import { Car } from '../shared/entities/car.entity';
import { IUserSignIn } from './interfaces/requests/user-sign-in.interface';

/** Сервис для работы с пользователями */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  /** Проставить произвольную машину мечты для пользователя */
  async createAndAssignRandomCar(userDto: IUser): Promise<User> {
    const user = this.userRepository.create(userDto);
    const cars = await this.carRepository.find(); // Получаем все доступные автомобили

    // Выбираем случайный автомобиль
    const randomCar = cars[Math.floor(Math.random() * cars.length)];

    // Присваиваем выбранный автомобиль пользователю
    user.car = randomCar;

    // Обновляем свойство user в объекте автомобиля
    randomCar.user = user;

    // Сохраняем оба объекта в базе данных
    await this.userRepository.save(user);
    await this.carRepository.save(randomCar);

    return user;
  }

  /** Проставить относительно машины мечты конкретную рандомную машину */
  async assignCarForUserDream(id: string): Promise<void | NotFoundException> {
    const userEntity = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userEntity) {
      throw NotFoundException;
    }
    const user = await this.userRepository.findOne({
      where: {
        id: userEntity.id,
      },
    });
    if (user && userEntity.dreamCar) {
      const brandCars = await this.carRepository.find({
        where: {
          brand: userEntity.dreamCar,
        },
      });
      const randomDreamCar =
        brandCars[Math.floor(Math.random() * brandCars.length)];
      user.car = randomDreamCar;
      await this.userRepository.save(user);
    }
  }

  /** Создать нового пользователя */
  async create(
    user: IUserSignIn,
  ): Promise<Omit<IUserSignIn, 'password'> | BadRequestException> {
    const users = await this.userRepository.find();
    const findeduser = users.findIndex(
      (u) => u.login == user.login || u.email === user.login,
    );
    if (findeduser > -1) {
      throw new BadRequestException(
        `Пользователь с логином: ${user.login} и почтой ${user.email} уже существует`,
      );
    }
    const newUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  /** Получить пользователя по логину */
  async getOneByLogin(
    login: string,
  ): Promise<Omit<User, 'password'> | NotFoundException> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException(`User with login:${login} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  /** Обновить информацию о пользователе */
  async update(id: string, user: IUser): Promise<NotFoundException | IUser> {
    const userEntity = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userEntity) {
      throw NotFoundException;
    }
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
    const userForUpdate = {
      ...userEntity,
      dreamCar: user.dreamCar,
      email: user.email,
      name: user.name,
      password: user.password,
      login: user.login,
    };
    await this.userRepository.upsert(userForUpdate, ['id']);
    return userForUpdate as IUser;
  }
}
