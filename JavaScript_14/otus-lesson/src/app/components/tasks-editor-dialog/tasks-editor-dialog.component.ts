import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ITask } from 'app/shared/interfaces/task.interface';
import { Level } from 'app/shared/enums/level.enum';
import { TagsRepository } from 'app/containers/tags/tags.repository';
import { IReturnDialogData } from '../../shared/interfaces/return-dialog-data';
import { StoreService } from '../../shared/services/store.service';

/**
 *
 */
@Component({
  standalone: true,
  templateUrl: './tasks-editor-dialog.component.html',
  styleUrls: ['./tasks-editor-dialog.component.scss'],
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
  providers: [StoreService, TagsRepository],
})
export class TasksEditorDialogComponent implements OnInit {
  tags$ = this._tagsRepository.getAll();

  levelArray = Object.values(Level);

  formGroup = new UntypedFormGroup({
    id: new FormControl<number | null | undefined>(null),
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    exampleData: new FormControl<string>('', { nonNullable: true }),
    tags: new FormControl<number[]>([], { nonNullable: true }),
    level: new FormControl<Level>(Level.EASY, { nonNullable: true }),
  });

  constructor(
    private _tagsRepository: TagsRepository,
    @Inject(MAT_DIALOG_DATA)
    private data: ITask,
    private _dialogRef: MatDialogRef<TasksEditorDialogComponent, IReturnDialogData<ITask>>
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
    this._dialogRef.close({ ok: true, data: this.formGroup.value as unknown as ITask });
  }
}
