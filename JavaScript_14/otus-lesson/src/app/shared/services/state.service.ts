import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuthUser } from '../interfaces/auth-user.interface';

/**
 *
 */
@Injectable()
export class StateService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  currentAuthUser$ = new BehaviorSubject<IAuthUser | null>(null);
}
