import { createReducer, on } from '@ngrx/store';
import * as UsersActions from '../actions/users.actions';
import { USERS_KEY } from '../services/store.service';
import { IUser } from '../interfaces/user.interface';
import { DEFAULT_ROLES } from '../constants/default-roles';



const getUsers = (): IUser[] => {
  const localUsers = (JSON.parse(String(localStorage.getItem(USERS_KEY))) as IUser[]) || [];
  if(localUsers && localUsers.filter(u => u.login === 'admin').length === 0) {
    localUsers.push({ id: 0, login: 'admin', password: 'admin', roles: [DEFAULT_ROLES[0].id] });
  }
  return localUsers;
}
export interface UsersState {
  users: IUser[];
}

export const initialState: UsersState = {
  users: getUsers()
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.usersCreate, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UsersActions.usersUpdate, (state, { user }) => ({ ...state, users: state.users.map(t => t.id === user.id ? user : t) })),
  on(UsersActions.usersDelete, (state, { userId }) => ({ ...state, users: state.users.filter(t => t.id !== userId) }))
);