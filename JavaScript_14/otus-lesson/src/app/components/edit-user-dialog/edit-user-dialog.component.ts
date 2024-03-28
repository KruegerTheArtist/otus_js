import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { DEFAULT_ROLES } from 'app/shared/constants/default-roles';
import { IUser } from 'app/shared/interfaces/user.interface';
import { IReturnDialogData } from '../../shared/interfaces/return-dialog-data';
import { StoreService } from '../../shared/services/store.service';

/**
 *
 */
@Component({
  standalone: true,
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatDialogModule,
  ],
  providers: [StoreService],
})
export class EditUserDialogComponent {
  formGroup = new UntypedFormGroup({
    id: new FormControl(null),
    login: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    roles: new FormControl([]),
  });

  allRoles = DEFAULT_ROLES;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IUser,
    private _dialogRef: MatDialogRef<EditUserDialogComponent, IReturnDialogData<IUser>>
  ) {
    this.formGroup.patchValue(data);
    this.formGroup.controls.roles.setValue(data.roles);
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
    console.log(this.formGroup);
    this._dialogRef.close({ ok: true, data: this.formGroup.value });
  }
}
