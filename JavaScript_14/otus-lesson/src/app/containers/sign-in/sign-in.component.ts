import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, filter, mergeMap, take, tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StateService } from 'app/shared/services/state.service';
import { Router, RouterModule } from '@angular/router';
import { UsersRepository } from '../users/users.repository';
import { AUTH_USER_KEY, StoreService } from '../../shared/services/store.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/shared/reducers/auth.reducer';
import { login as loginUser } from '../../shared/actions/auth.actions';
import { IUser } from 'app/shared/interfaces/user.interface';
import { IAuthUser } from 'app/shared/interfaces/auth-user.interface';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [StoreService, UsersRepository, StateService],
})
export class SignInComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    login: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  auth$?: Observable<AuthState>;

  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    @SkipSelf()
    private _stateService: StateService,
    private _storeService: StoreService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _usersRepository: UsersRepository,
    private store: Store<{ auth: AuthState }>
  ) {}

  /** @inheritdoc */
  ngOnInit(): void {
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((data) => {
      console.log(data)
    })
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  /**
   *
   */
  login(): void {
    const { login, password } = this.formGroup.value;
    if (!login || !password) {
      this._snackBar.open('Заполните все обязательные поля', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack-fail',
      });
      return;
    }

    this._usersRepository.getOne(login, password).pipe(take(1),
    tap((user) => {
      if(user) {
        const authUser = { authDate: new Date(), ...user };
        this._storeService.set(AUTH_USER_KEY, authUser);
        this._snackBar.open('Авторизация успешна', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snack-success',
        });
        this.store.dispatch(loginUser(authUser as IAuthUser))
        this._router.navigate(['']);
      }
      }),
      filter((user) => !user),
      tap(() => {
        this._snackBar.open('Неверный логин или пароль', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snack-fail',
        });
        this.formGroup.controls.login.setErrors({ incorrect: true });
        this.formGroup.controls.password.setErrors({ incorrect: true });
      })).subscribe();




    // const user = this._usersRepository.getOne(login, password);
    // if (user) {
    //   const authUser = { authDate: new Date(), ...user };
    //   this._storeService.set(AUTH_USER_KEY, authUser);
    //   this._stateService.isLoggedIn$.next(true);
    //   this._stateService.currentAuthUser$.next(authUser);
    //   this._snackBar.open('Авторизация успешна', '', {
    //     duration: 2000,
    //     horizontalPosition: 'right',
    //     verticalPosition: 'top',
    //     panelClass: 'snack-success',
    //   });
    //   console.log(this.store.subscribe(x => console.log(x)));
    //   this.store.dispatch(loginUser(authUser))
      
    //   this._router.navigate(['']);
    // } else {
    //   this._snackBar.open('Неверный логин или пароль', '', {
    //     duration: 2000,
    //     horizontalPosition: 'right',
    //     verticalPosition: 'top',
    //     panelClass: 'snack-fail',
    //   });
    //   this.formGroup.controls.login.setErrors({ incorrect: true });
    //   this.formGroup.controls.password.setErrors({ incorrect: true });
    // }
    // this._cdr.detectChanges();
  }
}
