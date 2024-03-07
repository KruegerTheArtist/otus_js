import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '../../shared/services/translate.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil, tap } from 'rxjs';
import { RecentlyAddedRepository } from '../recently-added/recently-added.repository';
import { SETTINGS_KEY, StoreService } from '../../shared/services/store.service';
import { getWordsArrayByLang } from 'app/shared/utils/get-words-array-by-lang.util';
import { ISettings } from '../../shared/interfaces/settings.interface';

@Component({
  standalone: true,
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule, MatSnackBarModule
  ],
  providers: [TranslateService, RecentlyAddedRepository, StoreService],
})
export class LessonComponent implements OnInit, OnDestroy {

  searchText = new FormControl('');

  selectedWord: string = '';

  isTranslated = false
  
  private _userSettings = this._storeService.get<ISettings>(SETTINGS_KEY);

  /** Событие отписки */
  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _translateService: TranslateService,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _storeService: StoreService,
    private _recentlyAddedRepository: RecentlyAddedRepository) {

  }

  ngOnInit(): void {
    this.getRandomWord();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  getRandomWord(): string | void {
    if(this._userSettings && this._userSettings.myLang && this._userSettings.otherLang) {
      const wordsArray = getWordsArrayByLang(this._userSettings.otherLang);
      const word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      this.selectedWord = word;
      return this.selectedWord;
    }
  }

  handleTranslateWord(word: string) {
    if(!this._userSettings) {
      return;
    }
    this._translateService.getTranslateWord(word, this._userSettings.otherLang, this._userSettings.myLang)
    .pipe(
      tap((response) => {
        console.log(response.responseData.translatedText, this.searchText.value);
        if(this._userSettings && response.responseData.translatedText.toLowerCase() === this.searchText.value?.toLowerCase()) {
          this.isTranslated = true
          this._snackBar.open('Верно', '', {duration: 2000});
          this._recentlyAddedRepository.add({
              word: response.responseData.translatedText,
              lang: this._userSettings.otherLang,
              date: new Date()
            });
          this.searchText.reset();
          this.getRandomWord()
        }
      }),
      takeUntil(this._ngUnsubscribe$)).subscribe(() => this._cdr.detectChanges());
  }
}
