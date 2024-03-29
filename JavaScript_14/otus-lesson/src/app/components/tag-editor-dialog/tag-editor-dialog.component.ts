import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ITag } from 'app/shared/interfaces/tag.interface';
import { StoreService } from '../../shared/services/store.service';
import { IReturnDialogData } from '../../shared/interfaces/return-dialog-data';

/**
 *
 */
@Component({
  standalone: true,
  templateUrl: './tag-editor-dialog.component.html',
  styleUrls: ['./tag-editor-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDialogModule,
  ],
  providers: [StoreService],
})
export class TagEditorDialogComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    id: new FormControl<number | null | undefined>(null),
    name: new FormControl<string>('', { nonNullable: true }),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ITag,
    private _dialogRef: MatDialogRef<TagEditorDialogComponent, IReturnDialogData<ITag>>
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }

  /**
   *
   */
  handleCancel(): void {
    this._dialogRef.close({ cancel: true });
  }

  /**
   *
   */
  handleOk() {
    this._dialogRef.close({ ok: true, data: this.formGroup.value });
  }
}
