import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CarsModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService],
})
export class AppModule {}
