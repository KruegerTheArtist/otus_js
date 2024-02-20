import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SECRET_KEY } from './auth/constants/secret-key';

@Module({
  imports: [
    CarsModule,
    AuthModule,
    UsersModule,
    PassportModule,
    // JwtModule.register({
    //   secret: SECRET_KEY,
    //   signOptions: { expiresIn: '1h' },
    // }),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'D48c1Wg1',
    //   database: 'otus_postgres',
    //   entities: ['./shared/entities/*/*.entity.ts'],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
