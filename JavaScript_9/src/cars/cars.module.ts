import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './repository/cars.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/shared/entities/car.entity';
import { User } from 'src/shared/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CarsController],
  imports: [TypeOrmModule.forFeature([Car, User]), UsersModule],
  providers: [CarsService, CarsRepository],
})
export class CarsModule {}
