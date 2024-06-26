import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRecentlyAdded } from 'app/shared/interfaces/recently-added.interface';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { ISettings } from 'app/shared/interfaces/settings.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddWordDialogComponent } from 'app/components/add-word-dialog/add-word-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SETTINGS_KEY, StoreService } from '../../shared/services/store.service';
import { RecentlyAddedRepository } from './recently-added.repository';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/shared/reducers/auth.reducer';
import { decrement, increment, reset } from 'app/shared/actions/counter.actions';
import { CountState } from 'app/shared/reducers/counter.reducer';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  imports: [CommonModule, MatSnackBarModule, MatDialogModule],
  providers: [RecentlyAddedRepository, StoreService],
})
export class RecentlyAddedComponent implements OnInit, OnDestroy {
  data: IRecentlyAdded[] = [];

  categories?: string[];

  private _userSettings = this._storeService.get<ISettings>(SETTINGS_KEY);

  // auth$?: Observable<AuthState>;
  count$?: Observable<number>;

  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _recentlyAddedRepository: RecentlyAddedRepository,
    private _snackBar: MatSnackBar,
    private _storeService: StoreService,
    private _dialog: MatDialog,
    private store: Store<{auth: AuthState, count: CountState}>
  ) {}

  
  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  /**
   *
   */
  ngOnInit(): void {
      console.log(this.store);
      this._initData();
      // this.auth$ = this.store.select('auth');
      // this.auth$.subscribe((data) => {
      //   console.log(data)
      // })
      // this.count$ = this.store.select('count');
  }

  aaa(a: unknown) {
    console.log(a);
    
  }

  /**
   *
   */
  ngOnDestroy(): void {}

  /**
   *
   */
  getFilteredData(category: string): IRecentlyAdded[] {
    return this.data.filter((x) => x.lang === category);
  }

  private _initData(): void {
    this.data = this._recentlyAddedRepository
      .getAll()
      .sort((x, y) => (x.date < y.date ? 1 : -1));
    this.categories = Array.from(new Set(this.data.map((x) => x.lang)).values());
  }

  /**
   *
   */
  addWord(): void {
    if (!this._userSettings) {
      return;
    }
    this._dialog
      .open(AddWordDialogComponent, {
        panelClass: 'dialog',
      })
      .afterClosed()
      .pipe(
        filter((result) => result.ok),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe((response) => {
        if (response.data) {
          if (
            this._recentlyAddedRepository
              .getAll()
              .findIndex((x) => x.word === response.data.word) > -1
          ) {
            this._snackBar.open('Слово было добавлено ранее', '', {
              duration: 2000,
              panelClass: 'snack-fail',
            });
            return;
          }
          this._snackBar.open('Слово добавлено', '', {
            duration: 2000,
            panelClass: 'snack-success',
          });
          this._recentlyAddedRepository.add(response.data);
        }
      });
  }
}
