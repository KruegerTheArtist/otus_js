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
import { Subject, filter, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TagEditorDialogComponent } from 'app/components/tag-editor-dialog/tag-editor-dialog.component';
import { ITag } from '../../shared/interfaces/tag.interface';
import { TagsRepository } from './tags.repository';

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
  tags: ITag[] = [];

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
    this.getRandomWord();
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
  getRandomWord(): string | void {
    this.tags = this._tagsRepository.getAll();
  }

  /**
   *
   */
  addTag(): void {
    this._dialog
      .open(TagEditorDialogComponent, {
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
            this._tagsRepository.getAll().findIndex((x) => x.name === response.data.name) > -1
          ) {
            this._snackBar.open('Тег был добавлен ранее', '', {
              duration: 2000,
              panelClass: 'snack-fail',
            });
            return;
          }
          this._snackBar.open('Тег добавлен', '', {
            duration: 2000,
            panelClass: 'snack-success',
          });
          this._tagsRepository.add(response.data);
          this.getRandomWord();
          this._cdr.detectChanges();
        }
      });
  }

  /**
   *
   */
  editTag(tag: ITag): void {
    this._dialog
      .open(TagEditorDialogComponent, {
        panelClass: 'dialog',
        data: tag,
      })
      .afterClosed()
      .pipe(
        filter((result) => result.ok),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe((response) => {
        if (response.data) {
          if (
            this._tagsRepository.getAll().findIndex((x) => x.name === response.data.name) > -1
          ) {
            this._snackBar.open('Тег был добавлен ранее', '', {
              duration: 2000,
              panelClass: 'snack-fail',
            });
            return;
          }
          this._snackBar.open('Тег добавлен', '', {
            duration: 2000,
            panelClass: 'snack-success',
          });
          this._tagsRepository.add(response.data);
          this.getRandomWord();
          this._cdr.detectChanges();
        }
      });
  }

  /**
   *
   */
  deleteTag(tag: ITag): void {
    this._tagsRepository.delete(tag);
    this.getRandomWord();
  }
}
