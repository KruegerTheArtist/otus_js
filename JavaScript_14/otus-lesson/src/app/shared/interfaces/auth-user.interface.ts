import { IUser } from './user.interface';

/**
 *
 */
export interface IAuthUser extends IUser {
  authDate: Date;
}
