import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITranslateResponse } from '../interfaces/translate-response.interface';

/** Сервис для работы с переводчиком */
@Injectable()
export class TranslateService {
  constructor(private _httpClient: HttpClient) {}

  /** Получить перевод слова */
  getTranslateWord(word: string, from: string, to: string): Observable<ITranslateResponse> {
    return this._httpClient.get<ITranslateResponse>(
      `https://api.mymemory.translated.net/get`,
      {
        params: {
          q: word,
          langpair: `${from}|${to}`,
        },
      }
    );
  }
}
