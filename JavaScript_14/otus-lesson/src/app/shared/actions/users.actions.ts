import { createAction } from '@ngrx/store';
import { IUser } from '../interfaces/user.interface';


export const usersAll = createAction('[Users] all');
export const usersCreate = createAction('[Users] create', (user: IUser) => ({ user }));
export const usersDelete = createAction('[Users] delete', (userId: number) => ({ userId }));
export const usersUpdate = createAction('[Users] update', (user: IUser) => ({ user }));