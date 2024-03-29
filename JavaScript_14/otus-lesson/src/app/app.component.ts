import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { AUTH_USER_KEY, StoreService } from './shared/services/store.service';
import { IAuthUser } from './shared/interfaces/auth-user.interface';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { IConfirmDialogData } from './shared/interfaces/confirm-dialog-data.interface';
import { StateService } from './shared/services/state.service';

export const MATERIAL_MODULES = [MatButtonModule];

/**
 *
 */
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    ...MATERIAL_MODULES,
  ],
  providers: [StoreService, StateService],
})
export class AppComponent {
  title = 'otus-lesson';

  private _ngUnsubscribe$ = new Subject<void>();

  
  get isLoggedIn$() : Observable<boolean> {
    return this._stateService.isLoggedIn$;
  }
  

  constructor(
    private _stateService: StateService,
    private _storeService: StoreService,
    private _snackBar: MatSnackBar,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this._checkAuth();
  }

  /**
   *
   */
  logout(): void {
    this._dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Выход',
          message: 'Вы действительно хотите выйти из аккаунта?',
          accept: 'Выход',
          reject: 'Отмена',
        } as IConfirmDialogData,
      })
      .afterClosed()
      .pipe(
        filter((result) => result.ok),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(() => {
        this._storeService.remove(AUTH_USER_KEY);
        this._stateService.isLoggedIn$.next(false);
        this._stateService.currentAuthUser$.next(null);
        this._snackBar.open('Вы вышли из аккаунта', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snack-fail',
        });
        this._router.navigate(['/sign-in']);
        this._cdr.detectChanges();
      });
  }

  /** Проверить авторизацию */
  private _checkAuth(): void {
    const authUser: IAuthUser | void = this._storeService.get(AUTH_USER_KEY);
    if (!authUser) {
      return;
    }

    if (
      authUser &&
      new Date().getTime() - new Date(authUser?.authDate).getTime() >= 15 * 60 * 1000
    ) {
      this._storeService.remove(AUTH_USER_KEY);
        this._stateService.currentAuthUser$.next(null);
        this._snackBar.open('Авторизация истекла, пожалуйста авторизуйтесь', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack-fail',
      });
      this._router.navigate(['/sign-in']);
      return;
    }
    this._stateService.isLoggedIn$.next(true);
    this._stateService.currentAuthUser$.next(authUser);
  }
}
