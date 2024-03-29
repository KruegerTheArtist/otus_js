import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { IUser } from 'app/shared/interfaces/user.interface';
import { StateService } from 'app/shared/services/state.service';
import { Router, RouterModule } from '@angular/router';
import { UsersRepository } from '../users/users.repository';
import { AUTH_USER_KEY, StoreService } from '../../shared/services/store.service';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    name: new FormControl(''),
    login: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    @SkipSelf()
    private _stateService: StateService,
    private _storeService: StoreService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _usersRepository: UsersRepository
  ) {}

  /** @inheritdoc */
  ngOnInit(): void {}

  /** @inheritdoc */
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  /**
   *
   */
  register(): void {
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
    const user = this._usersRepository.getOneByLogin(login);
    if (user) {
      this._snackBar.open('Пользователь с таким логином уже существует', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack-fail',
      });
      this.formGroup.controls.login.setErrors({ incorrect: true });
      this.formGroup.controls.password.setErrors({ incorrect: true });
    } else {
      const newUser = this._usersRepository.add(this.formGroup.value as IUser);
      const authUser = { authDate: new Date(), ...newUser };
      this._storeService.set(AUTH_USER_KEY, authUser);
      this._stateService.isLoggedIn$.next(true);
      this._stateService.currentAuthUser$.next(authUser);
      this._snackBar.open('регистрация успешна', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack-success',
      });
      this._router.navigate(['']);
    }
  }
}
