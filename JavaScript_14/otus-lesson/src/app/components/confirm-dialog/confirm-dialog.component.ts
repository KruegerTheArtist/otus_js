import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { IConfirmDialogData } from 'app/shared/interfaces/confirm-dialog-data.interface';
import { IReturnDialogData } from '../../shared/interfaces/return-dialog-data';

/**
 *
 */
@Component({
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, CommonModule, MatDialogModule],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IConfirmDialogData,
    private _dialogRef: MatDialogRef<ConfirmDialogComponent, IReturnDialogData<null>>
  ) {}

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
    this._dialogRef.close({ ok: true });
  }
}
