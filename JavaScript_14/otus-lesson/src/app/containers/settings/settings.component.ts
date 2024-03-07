import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SETTINGS_KEY, StoreService } from '../../shared/services/store.service';
import { ISettings } from 'app/shared/interfaces/settings.interface';
import { Subject, noop, takeUntil, tap } from 'rxjs';
import { LANGUAGES } from 'app/shared/constants/languages-array';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, CommonModule, MatSelectModule],
  providers: [StoreService]
})
export class SettingsComponent implements OnInit, OnDestroy {

  formGroup = new FormGroup({
    myLang: new FormControl(''),
    otherLang: new FormControl(''),
  })

  /** Массив языков которые можно выбрать */
  langArray = LANGUAGES;

  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(private _storeService: StoreService) {}

  /** @inheritdoc */
  ngOnInit(): void {
    this._initData();
    this._initFormGroupValueChangesSubscribe();
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  /** Инициализировать данные */
  private _initData(): void {
    const settings = this._storeService.get<ISettings>(SETTINGS_KEY);
    if(settings) {
      this.formGroup.patchValue(settings);
    }
  }

  /** Инициализация подписки на изменения формы */
  private _initFormGroupValueChangesSubscribe(): void {
    this.formGroup.valueChanges.pipe(
      tap(() => this._storeService.set(SETTINGS_KEY, this.formGroup.value)),
      takeUntil(this._ngUnsubscribe$)).subscribe(noop)
  }

}
