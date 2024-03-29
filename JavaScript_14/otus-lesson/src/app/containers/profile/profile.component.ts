import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  SkipSelf,
} from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StateService } from 'app/shared/services/state.service';
import { IAuthUser } from 'app/shared/interfaces/auth-user.interface';
import { IUser } from 'app/shared/interfaces/user.interface';
import { DEFAULT_ROLES } from 'app/shared/constants/default-roles';
import { EditUserDialogComponent } from 'app/components/edit-user-dialog/edit-user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StoreService } from '../../shared/services/store.service';
import { UsersRepository } from '../users/users.repository';

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
  ],
  providers: [StoreService, UsersRepository, StateService],
})
export class ProfileComponent implements OnInit, OnDestroy {
  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  /**
   *
   */
  get currentUser$(): Observable<IAuthUser | null> {
    return this._stateService.currentAuthUser$;
  }

  /**
   *
   */
  get userList(): IUser[] {
    return this._usersRepository.getAll();
  }

  allRoles = DEFAULT_ROLES;

  constructor(
    @SkipSelf()
    private _stateService: StateService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
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
  isAdmin(user: IAuthUser | null): boolean {
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

  private _updateUser(user: IUser): void {
    this._usersRepository.update(user);
    this._snackBar.open('Пользователь обновлен', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-success',
    });
    this._cdr.markForCheck();
  }
}
