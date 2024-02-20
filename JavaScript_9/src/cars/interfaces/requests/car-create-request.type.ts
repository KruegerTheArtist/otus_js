import { ICar } from '../car.interface';

/** Запрос на создание авто */
export type CarCreateRequest = Omit<ICar, 'id'>;
