import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../shared/services/store.service';
import { LANGUAGES } from '../../shared/constants/languages-array';
import { IReturnDialogData } from '../../shared/interfaces/return-dialog-data';
import { IRecentlyAdded } from 'app/shared/interfaces/recently-added.interface';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  templateUrl: './add-word-dialog.component.html',
  styleUrls: ['./add-word-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, CommonModule, MatDialogModule
  ],
  providers: [StoreService],
})
export class AddWordDialogComponent {

    langArray = LANGUAGES;

    formGroup = new FormGroup({
        word: new FormControl(''),
        lang: new FormControl(''),
    })

  constructor(
    private _dialogRef: MatDialogRef<AddWordDialogComponent, IReturnDialogData>) {

  }

  handleCancel(): void {
    this._dialogRef.close({cancel: true});
  }

  handleOk() {
    const handleModel = {
      word: this.formGroup.controls.word.value,
      lang: this.formGroup.controls.lang.value,
      date: new Date()
    } as IRecentlyAdded;
    this._dialogRef.close({ok: true, data: handleModel})
  }
}
