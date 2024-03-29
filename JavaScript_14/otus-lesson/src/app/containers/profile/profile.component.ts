import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IAuthUser } from 'app/shared/interfaces/auth-user.interface';
import { IUser } from 'app/shared/interfaces/user.interface';
import { DEFAULT_ROLES } from 'app/shared/constants/default-roles';
import { EditUserDialogComponent } from 'app/components/edit-user-dialog/edit-user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StoreService } from '../../shared/services/store.service';
import { UsersRepository } from '../users/users.repository';
import { UsersState } from 'app/shared/reducers/users.reducer';
import { AuthState } from 'app/shared/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';
import { IConfirmDialogData } from 'app/shared/interfaces/confirm-dialog-data.interface';
import { MatIconModule } from '@angular/material/icon';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [StoreService, UsersRepository],
})
export class ProfileComponent implements OnInit, OnDestroy {
  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  /**
   *
   */
  get currentUser$(): Observable<AuthState | null> {
    return this.store.select('auth');
  }

  /**
   *
   */
  get userList$(): Observable<UsersState> {
    return this._usersRepository.getAll();
  }

  allRoles = DEFAULT_ROLES;

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private store: Store<{auth: AuthState}>,
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
  isAdmin(user: IAuthUser | null | undefined): boolean {
    if (!user) {
      return false;
    }
    return user?.roles?.includes(DEFAULT_ROLES.filter((x) => x.name === 'Admin')[0].id);
  }

  /**
   *
   */
  getRolesString(roles: number[] | undefined): string {
    if (!roles) {
      return '';
    }
    return roles.map((x) => DEFAULT_ROLES.filter((r) => r.id === x)[0].name).join(', ');
  }

  /**
   *
   */
  openEditUserDialog(user: IUser): void {
    this._dialog
      .open(EditUserDialogComponent, {
        data: user,
      })
      .afterClosed()
      .pipe(
        filter((result) => result?.ok),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe((result) => {
        this._updateUser(result.data);
      });
  }

  deleteUser(user: IUser): void {
    const title = `Удаление пользователя ${user.name}`;
    const message = 'Вы уверены, что хотите удалить его?';
    const action = 'Удалить';

    this._dialog
      .open(ConfirmDialogComponent, { data: { title, message, action } })
      .afterClosed()
      .pipe(
        filter((result) => result?.ok),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(() => {
        this._usersRepository.delete(user);
        this._snackBar.open('Пользователь удален', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snack-fail',
        });
        this._cdr.detectChanges();
      });
  }

  private _updateUser(user: IUser): void {
    this._usersRepository.update(user);
    this._snackBar.open('Пользователь обновлен', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-success',
    });
    this._cdr.detectChanges();
  }
}
