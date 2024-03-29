import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { IAuthUser } from '../interfaces/auth-user.interface';
import { AUTH_USER_KEY } from '../services/store.service';

export interface AuthState {
  isLoggedIn: boolean;
  currentAuthUser: IAuthUser | null;
}

export const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem(AUTH_USER_KEY),
  currentAuthUser: (JSON.parse(String(localStorage.getItem(AUTH_USER_KEY))) as IAuthUser)
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { currentAuthUser }) => ({ ...state, isLoggedIn: true, currentAuthUser: currentAuthUser })),
  on(AuthActions.logout, state => ({ ...state, isLoggedIn: false, currentAuthUser: null }))
);