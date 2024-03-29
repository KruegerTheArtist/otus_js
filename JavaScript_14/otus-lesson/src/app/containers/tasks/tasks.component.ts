import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, filter, forkJoin, mergeMap, of, take, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ITask } from 'app/shared/interfaces/task.interface';
import { TasksEditorDialogComponent } from 'app/components/tasks-editor-dialog/tasks-editor-dialog.component';
import { TasksRepository } from './tasks.repository';
import { ITag } from '../../shared/interfaces/tag.interface';
import { StoreService, TAGS_KEY } from '../../shared/services/store.service';
import { TasksState } from 'app/shared/reducers/tasks.reducer';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [TasksRepository, StoreService],
})
export class TasksComponent implements OnInit, OnDestroy {
  
  public get tasks$() : Observable<TasksState> {
    return this._tasksRepository.getAll()
  }
  
  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _storeService: StoreService,
    private _tasksRepository: TasksRepository
  ) {}

  /**
   *
   */
  ngOnInit(): void {
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  /**
   *
   */
  addTask(): void {
    this._dialog
      .open(TasksEditorDialogComponent, {
        panelClass: 'dialog',
      })
      .afterClosed()
      .pipe(
        filter((result) => result.ok),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe((response) => {
        if (response.data) {
          this._snackBar.open('Задача добавлена', '', {
            duration: 2000,
            panelClass: 'snack-success',
          });
          this._tasksRepository.add(response.data);
          this._cdr.detectChanges();
        }
      });
  }

  /**
   *
   */
  editTask(tag: ITask): void {
    this._dialog
      .open(TasksEditorDialogComponent, {
        panelClass: 'dialog',
        data: tag,
      })
      .afterClosed()
      .pipe(
        filter((result) => Boolean(result?.ok)),
        mergeMap((response) => {
          return forkJoin([of(response), this._tasksRepository.getAll().pipe(take(1))]) }),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(([response, tasksResponse]) => {
        if (response.data) {
          if (
            tasksResponse.tasks.findIndex((x) => x.id === response.data.id) > -1
          ) {
            this._tasksRepository.update(response.data);
            this._snackBar.open('Успешно обновлено', '', {
              duration: 2000,
              panelClass: 'snack-success',
            });
          } else {
            this._snackBar.open('Такая задача не найдена', '', {
              duration: 2000,
              panelClass: 'snack-fail',
            });
          }

          this._cdr.detectChanges();
        }
      });
  }

  /**
   *
   */
  deleteTask(tag: ITask): void {
    this._tasksRepository.delete(tag);
  }

  /**
   *
   */
  getTagsName(tags: number[]): string {
    const tagsStore = this._storeService.get<ITag[]>(TAGS_KEY);
    if (!tags || tags.length === 0 || !tagsStore || tagsStore.length === 0) {
      return '';
    }
    console.log(tags);

    return tagsStore
      .filter((x) => tags.includes(Number(x.id)))
      .map((x) => x.name)
      .join(', ');
  }
}
