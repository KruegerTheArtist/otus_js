import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, filter, forkJoin, mergeMap, of, take, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TagEditorDialogComponent } from 'app/components/tag-editor-dialog/tag-editor-dialog.component';
import { ITag } from '../../shared/interfaces/tag.interface';
import { TagsRepository } from './tags.repository';
import { TagsState } from 'app/shared/reducers/tags.reducer';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [TagsRepository],
})
export class TagsComponent implements OnInit, OnDestroy {
  public get tags$() : Observable<TagsState> | null {
    return this._tagsRepository.getAll()
  }

  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _tagsRepository: TagsRepository
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
  addTag(): void {
    this._dialog
      .open(TagEditorDialogComponent, {panelClass: 'dialog'})
      .afterClosed()
      .pipe(
        filter(result => result.ok),
        mergeMap(response => forkJoin([
          of(response),
          this._tagsRepository.getAll().pipe(take(1))
        ])),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(([response, tagsResponse]) => {
        const { name } = response.data;
        const existingTag = tagsResponse.tags.find(tag => tag.name === name);

        if (existingTag) {
          this._snackBar.open('Тег был добавлен ранее', '', {
            duration: 2000,
            panelClass: 'snack-fail'
          });
          return;
        }

        this._snackBar.open('Тег добавлен', '', {
          duration: 2000,
          panelClass: 'snack-success'
        });
        this._tagsRepository.add(response.data);
        this._cdr.detectChanges();
      });
  }


  /**
   *
   */
  editTag(tag: ITag): void {
    this._dialog
      .open(TagEditorDialogComponent, {panelClass: 'dialog', data: tag})
      .afterClosed()
      .pipe(
        filter(result => result.ok),
        mergeMap(response => forkJoin([of(response), this._tagsRepository.getAll().pipe(take(1))])),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(([response, tags]) => {
        const updatedTag = response.data;
        const existingTag = tags.tags.find(x => x.id === updatedTag.id);
        if (existingTag) {
          this._snackBar.open('Тег обновлен', '', {duration: 2000, panelClass: 'snack-success'});
          this._tagsRepository.update(updatedTag);
          this._cdr.detectChanges();
        }
      });
  }

  /**
   *
   */
  deleteTag(tag: ITag): void {
    const title = `Удаление тега ${tag.name}`;
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
        this._tagsRepository.delete(tag);
        this._snackBar.open('Тег удален', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snack-fail',
        });
        this._cdr.detectChanges();
      });
  }
}
